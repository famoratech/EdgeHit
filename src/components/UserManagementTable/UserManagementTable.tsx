"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  email: string;
  role: "user" | "admin" | "superadmin";
};

export default function UserManagementTable({
  currentUserId,
  currentUserRole,
}: {
  currentUserId: string;
  currentUserRole: "admin" | "superadmin";
}) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("id, email, role");

    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id: string, newRole: string) => {
    await supabase.from("profiles").update({ role: newRole }).eq("id", id);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await supabase.from("profiles").delete().eq("id", id);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isCurrentUser = user.id === currentUserId;
              const isSuperadmin = user.role === "superadmin";
              return (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 space-x-2">
                    {currentUserRole === "superadmin" && !isSuperadmin && (
                      <>
                        <button
                          onClick={() =>
                            updateRole(
                              user.id,
                              user.role === "admin" ? "user" : "admin"
                            )
                          }
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          {user.role === "admin"
                            ? "Revoke Admin"
                            : "Make Admin"}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {isSuperadmin && (
                      <span className="text-sm text-gray-500">
                        (Superadmin)
                      </span>
                    )}
                    {isCurrentUser && (
                      <span className="text-sm text-gray-500">(You)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
