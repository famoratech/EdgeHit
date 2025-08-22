"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useSupabaseUser({ redirectTo }: { redirectTo?: string } = {}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"user" | "admin" | "superadmin" | null>(
    null
  );

  const isAdmin = role === "admin" || role === "superadmin";

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUser(null);
        setRole(null);
      } else {
        setUser(data.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile) {
          setRole(profile.role);
        } else {
          // Optional: auto-insert
          await supabase.from("profiles").insert({
            id: data.user.id,
            email: data.user.email,
            role: "user",
          });
          setRole("user");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [redirectTo]);

  return { user, loading, isAdmin, role };
}
