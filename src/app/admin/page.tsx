// app/admin/page.tsx
"use client";

import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import UserManagementTable from "@/components/UserManagementTable/UserManagementTable";

export default function AdminPage() {
  const { user, loading, role } = useSupabaseUser({
    redirectTo: "/auth",
  });

  if (loading) return <p>Loading...</p>;
  if (!user || role !== "superadmin") return <p>Access denied</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <UserManagementTable currentUserId={user.id} currentUserRole={role} />
    </div>
  );
}
