"use client";

import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { uploadImage, supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function AddProjectPage() {
  const { user, loading, role } = useSupabaseUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user || role !== "superadmin") return <p>Access denied</p>;

  const handleSubmit = async (formData: {
    title: string;
    category: string;
    description?: string;
    image: File;
    is_published: boolean;
    domain_url?: string;
  }) => {
    if (!user?.id) {
      toast.error("Authentication required");
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrl = await uploadImage(formData.image);

      const { error } = await supabase
        .from("projects")
        .insert({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          image_url: imageUrl,
          is_published: formData.is_published,
          author_id: user.id,
          slug: generateSlug(formData.title),
          domain_url: formData.domain_url || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Project created!");
      router.push("/admin/portfolio");
    } catch (error: unknown) {
      console.error("Creation failed:", error);

      let errorMessage = "Failed to create project";
      let description = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = "Failed to create project";
        description = error.message.includes("RLS")
          ? "Permission denied. Check RLS policies."
          : error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        // Handle Supabase errors or other object errors
        const errorObj = error as { message?: string };
        errorMessage = "Failed to create project";
        description = errorObj.message?.includes("RLS")
          ? "Permission denied. Check RLS policies."
          : errorObj.message || "Unknown error";
      }

      toast.error(errorMessage, { description });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  if (loading || !user) return <div className="p-4">Loading...</div>;

  return (
    <div className="px-4 sm:px-6">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
        <ProjectForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  );
}
