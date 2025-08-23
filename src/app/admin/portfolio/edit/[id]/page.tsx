"use client";

import { useParams, useRouter } from "next/navigation";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { EditProjectForm } from "@/components/admin/EditProjectForm";
import { useEffect } from "react";

export default function EditProjectPage() {
  const params = useParams();
  const { user, loading, role } = useSupabaseUser();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user || role !== "superadmin") return <p>Access denied</p>;
  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Project</h1>
        <EditProjectForm projectId={params.id as string} />
      </div>
    </div>
  );
}
