"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Parse the URL and restore the session
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        router.push("/dashboard"); // or wherever you want to go after login
      } else {
        router.push("/auth");
      }
    });
  }, [router]);

  return <p className="p-4">Finishing sign in...</p>;
}
