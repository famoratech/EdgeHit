// lib/supabase/client.ts
// import { createBrowserClient } from "@supabase/ssr";
// import { Database } from "../types/supabase";

// export const supabase = createBrowserClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// lib/supabase/client.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

let supabaseInstance: SupabaseClient<Database> | null = null;

export const supabase: SupabaseClient<Database> = (() => {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error("Supabase env vars are missing");
    }

    supabaseInstance = createClient<Database>(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
})();
