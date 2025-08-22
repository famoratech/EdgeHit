"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditBlogPostPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const { user, loading, role } = useSupabaseUser({ redirectTo: "/login" });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState<"markdown" | "rich">("markdown");
  const [isDraft, setIsDraft] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [postId, setPostId] = useState<number | null>(null);
  const [richContent, setRichContent] = useState(""); // Added for rich text content

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        setError("Could not load blog post.");
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setRichContent(data.content); // Initialize rich content
      setIsDraft(data.is_draft);
      setPostId(data.id);
    };

    fetchPost();
  }, [slug]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const filename = `${uuidv4()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-media")
          .upload(filename, file);

        if (uploadError) {
          console.error("Upload failed:", uploadError.message);
          setError("Image upload failed.");
          continue;
        }

        const { data } = supabase.storage
          .from("blog-media")
          .getPublicUrl(filename);
        const imageMarkdown = `![${file.name}](${data.publicUrl})`;

        if (mode === "markdown") {
          setContent((prev) => `${prev}\n\n${imageMarkdown}\n`);
        } else {
          setRichContent(
            (prev) =>
              `${prev}<img src="${data.publicUrl}" alt="${file.name}" />`
          );
        }
      }
    },
    [mode]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpdate = async () => {
    setSubmitting(true);
    setError("");

    if (
      !title.trim() ||
      !(mode === "markdown" ? content.trim() : richContent.trim())
    ) {
      setError("Title and content are required.");
      setSubmitting(false);
      return;
    }

    if (!postId) {
      setError("Post ID not found. Please refresh and try again.");
      setSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .update({
          title,
          content: mode === "markdown" ? content : richContent,
          is_draft: isDraft,
          updated_at: new Date().toISOString(),
        })
        .eq("id", postId)
        .select(); // Add .select() to get the updated record

      console.log("Update response:", { data, error }); // Debug log

      if (error) {
        throw {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        };
      }

      if (!data) {
        throw new Error("No data returned from update");
      }

      router.push(`/blog/${slug}`);
      // } catch (err: any) {
      //   console.error("Full update error:", {
      //     message: err.message,
      //     details: err.details,
      //     stack: err.stack,
      //     code: err.code,
      //   });

      //   setError(`Failed to update post: ${err.message || "Unknown error"}`);
      // }
    } catch (err: unknown) {
      console.error("Full update error:", err);

      let errorMessage = "Failed to update post: Unknown error";

      if (err instanceof Error) {
        errorMessage = `Failed to update post: ${err.message}`;
      } else if (typeof err === "object" && err !== null) {
        // Handle object errors (like Supabase errors)
        const errorObj = err as { message?: string };
        errorMessage = `Failed to update post: ${
          errorObj.message || "Unknown error"
        }`;
      }

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) {
        throw error;
      }

      router.push("/blog");
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user || (role !== "admin" && role !== "superadmin")) {
    return (
      <p className="p-4 text-red-600 font-semibold">
        Access denied. Only admins can edit blog posts.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <input
        type="text"
        placeholder="Post title"
        className="w-full mb-4 p-3 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-4 flex gap-4">
        <label className="font-medium">Editor Mode:</label>
        <button
          onClick={() => setMode("markdown")}
          className={`px-3 py-1 border rounded ${
            mode === "markdown" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Markdown
        </button>
        <button
          onClick={() => setMode("rich")}
          className={`px-3 py-1 border rounded ${
            mode === "rich" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Rich Text
        </button>
      </div>

      <div
        {...getRootProps()}
        className={`mb-4 border-2 border-dashed rounded p-6 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag and drop images here to upload & insert</p>
        )}
      </div>

      {/* Editor */}
      {mode === "markdown" ? (
        <MDEditor
          value={content}
          onChange={(v = "") => setContent(v)}
          height={400}
        />
      ) : (
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setRichContent((e.target as HTMLElement).innerHTML)}
          className="min-h-[300px] border p-4 rounded mb-4"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(richContent) }}
        />
      )}

      {/* Post Status */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Post Status:</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={!isDraft}
              onChange={() => setIsDraft(false)}
              className="mr-2"
            />
            Publish
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={isDraft}
              onChange={() => setIsDraft(true)}
              className="mr-2"
            />
            Save as Draft
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Post"}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Post"}
        </button>
      </div>
    </div>
  );
}
