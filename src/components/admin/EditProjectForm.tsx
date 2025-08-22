"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { uploadImage, supabase } from "@/lib/supabase";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import type { Project } from "@/types";
import type { Project } from "@/lib/types";
import Image from "next/image";
interface EditProjectFormProps {
  projectId: string;
}

export function EditProjectForm({ projectId }: EditProjectFormProps) {
  const {
    user,
    // role,
    loading: authLoading,
  } = useSupabaseUser({ redirectTo: "/admin" });

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [preview, setPreview] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // Fetch project data
  useEffect(() => {
    if (!projectId || authLoading) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", projectId)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Project not found");

        setProject(data);
        setPreview(data.image_url);
        setIsPublished(data.is_published);
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error("Failed to load project");
        router.push("/admin/portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !user) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      // Handle image upload if changed
      const imageFile = formData.get("image") as File;
      const imageUrl =
        imageFile.size > 0 ? await uploadImage(imageFile) : project.image_url;

      // Update project
      const { error } = await supabase
        .from("projects")
        .update({
          title: formData.get("title"),
          category: formData.get("category"),
          description: formData.get("description"),
          image_url: imageUrl,
          is_published: isPublished,
          domain_url: formData.get("domain_url") || null, // Add domain_url

          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) throw error;

      toast.success("Project updated successfully");
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!project) {
    return <div className="p-4 text-red-500">Project not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div>
        <Label htmlFor="image">Project Image</Label>
        <div className="mt-2 flex items-center gap-4">
          {preview && (
            <div className="w-32 h-32 rounded-md overflow-hidden border">
              <Image
                src={preview}
                alt="Current project"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? "Change Image" : "Upload Image"}
          </Button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {preview === project.image_url
            ? "Upload new image to replace current"
            : "Leave empty to keep current image"}
        </p>
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={project.title} required />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          defaultValue={project.category}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project.description || ""}
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="domain_url">Project Website URL (optional)</Label>
        <Input
          id="domain_url"
          name="domain_url"
          type="url"
          defaultValue={project.domain_url || ""}
          placeholder="https://example.com"
        />
        <p className="mt-1 text-sm text-gray-500">
          Leave empty if this isn&apost a web project
        </p>
      </div>

      {/* Published Status */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="is_published"
          checked={isPublished}
          onCheckedChange={(checked) => setIsPublished(!!checked)}
        />
        <Label htmlFor="is_published">Publish this project</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/admin/portfolio")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
