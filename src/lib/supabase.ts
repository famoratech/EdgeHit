// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//   },
//   db: {
//     schema: "public",
//   },
// });

// export { createClient };

// // Re-export upload functions for convenience
// export * from "./upload";

// lib/supabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export const supabase: SupabaseClient = (() => {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      // Fail at runtime only if this is actually used
      throw new Error("Supabase env vars are missing");
    }

    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: "public",
      },
    });
  }
  return supabaseInstance;
})();

// Re-export upload functions for convenience
export * from "./upload";
