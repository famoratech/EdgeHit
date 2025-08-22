// app/api/oauth/facebook_ads/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/dashboard?error=missing_code");
  }

  const tokenParams = new URLSearchParams({
    client_id: process.env.FACEBOOK_ADS_CLIENT_ID!,
    client_secret: process.env.FACEBOOK_ADS_CLIENT_SECRET!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/facebook_ads/callback`,
    code,
  });

  const tokenURL = `https://graph.facebook.com/v19.0/oauth/access_token?${tokenParams}`;
  const tokenResponse = await fetch(tokenURL);
  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return NextResponse.redirect("/dashboard?error=token_failed");
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect("/auth?error=no_user");
  }

  const { error } = await supabase.from("ad_connections").upsert({
    user_id: user.id,
    platform: "facebook_ads",
    access_token: tokenData.access_token,
    refresh_token: null,
    expires_at: null,
  });

  if (error) {
    return NextResponse.redirect("/dashboard?error=db_write_failed");
  }

  return NextResponse.redirect("/dashboard?connected=facebook");
}
