"use client";
import { useEffect } from "react";
import ProjectTable from "@/components/admin/ProjectTable";
import { Button } from "@/components/ui/button";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPortfolioPage() {
  const { user, loading, role } = useSupabaseUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user || role !== "superadmin") return <p>Access denied</p>;

  return (
    <div className="min-h-screen w-full flex justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Manage Portfolio
          </h1>
          <div className="flex justify-center sm:justify-end">
            <Button asChild>
              <Link href="/admin/portfolio/add">Add New Project</Link>
            </Button>
          </div>
        </div>
        <ProjectTable />
      </div>
    </div>
  );
}
