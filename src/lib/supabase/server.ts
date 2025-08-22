"use server";

import { cookies } from "next/headers";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "@/lib/types/supabase";

export async function createServerSupabaseClient() {
  // Cast cookies() into the correct type so .getAll() works
  const cookieStore = cookies() as unknown as ReadonlyRequestCookies;

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The set method is not available in this environment
          }
        },
      },
    }
  );
}
