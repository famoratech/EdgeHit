// src/app/admin/blog/editor/page.tsx

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import Checkbox from "@mui/material/Checkbox";
// import { Checkbox } from "@/components/ui/checkbox";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

async function generateUniqueSlug(title: string): Promise<string> {
  // Convert title to slug format
  // let slug = title
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start/end

  // Check for duplicates and append number if needed
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const { count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("slug", uniqueSlug);

    if (count === 0) break;

    uniqueSlug = `${uniqueSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export default function BlogEditorPage() {
  const { user, loading, role } = useSupabaseUser({ redirectTo: "/login" });
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("## Write your post...");
  const [slug, setSlug] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const [generatingSlug, setGeneratingSlug] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file || !user) return;

      const filename = `${uuidv4()}-${file.name}`;
      setUploading(true);

      const { error: uploadError } = await supabase.storage
        .from("blog-media")
        .upload(filename, file);

      setUploading(false);

      if (uploadError) {
        console.error("Upload failed:", uploadError.message);
        setError("Image upload failed.");
      } else {
        setImageFilename(filename);
        setError(null);
      }
    },
    [user]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleGenerateSlug = async () => {
    if (!title.trim()) {
      setError("Please enter a title first");
      return;
    }

    setGeneratingSlug(true);
    try {
      const generatedSlug = await generateUniqueSlug(title);
      setSlug(generatedSlug);
      setError(null);
    } catch (err) {
      setError("Failed to generate slug");
      console.error(err);
    } finally {
      setGeneratingSlug(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !slug || !user) {
      setError("Please fill in all fields.");
      return;
    }

    if (role !== "admin" && role !== "superadmin") {
      setError("Only admins can create blog posts.");
      return;
    }

    const { error } = await supabase.from("blog_posts").insert([
      {
        title,
        content,
        slug,
        is_draft: isDraft,
        author_id: user.id,
        created_at: new Date().toISOString(),
        image: imageFilename,
      },
    ]);

    if (error) {
      console.error(error.message);
      setError("Failed to submit blog post.");
    } else {
      setError(null);
      router.push("/blog");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user || (role !== "admin" && role !== "superadmin")) {
    return (
      <div className="p-4 text-red-600 font-semibold">
        Access denied. Only admins can create blog posts.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Create New Blog Post</h1>

      <Input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex space-x-2">
        <Input
          placeholder="Slug (e.g. 'my-first-post')"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Button
          onClick={handleGenerateSlug}
          disabled={generatingSlug || !title.trim()}
          variant="outline"
        >
          {generatingSlug ? "Generating..." : "Generate Slug"}
        </Button>
      </div>

      <MDEditor
        value={content}
        onChange={(value) => setContent(value || "")}
        height={400}
      />

      <div
        {...getRootProps()}
        className="p-4 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>
            {uploading
              ? "Uploading..."
              : imageFilename
              ? `Image uploaded: ${imageFilename}`
              : "Drag & drop image, or click to select"}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="draft-mode"
          checked={isDraft}
          onChange={(event) => setIsDraft(event.target.checked)}
        />
        <Label htmlFor="draft-mode">Save as draft</Label>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button onClick={handleSubmit} disabled={uploading}>
        Submit Post
      </Button>
    </div>
  );
}
