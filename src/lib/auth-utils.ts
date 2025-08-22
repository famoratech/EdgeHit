import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "./types/supabase"; // replace with the path to your Supabase types
import { supabase } from "./supabase"; // optional if using `createServerClient` only

// 1. Get the Supabase user from the request session
export async function getUserFromSession() {
  const cookieStore = await cookies(); // ✅ MUST await
  const supabaseServer = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  return user;
}

// 2. Store OAuth token data in Supabase `ad_connections` table
export async function storeAccessToken({
  userId,
  platform,
  accessToken,
  refreshToken,
  expiresIn,
}: {
  userId: string;
  platform: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}) {
  const { error } = await supabase.from("ad_connections").upsert({
    user_id: userId,
    platform,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresIn ? Math.floor(Date.now() / 1000) + expiresIn : null,
  });

  if (error) {
    throw new Error(`Failed to store ${platform} token: ${error.message}`);
  }
}
