import { NextRequest, NextResponse } from "next/server";

// OAuth providers config
const oauthProviders = {
  google_ads: {
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/google_ads/callback`,
    auth_url: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "https://www.googleapis.com/auth/adwords",
  },
  facebook_ads: {
    client_id: process.env.FACEBOOK_ADS_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/facebook_ads/callback`,
    auth_url: "https://www.facebook.com/v18.0/dialog/oauth",
    scope: "ads_management,ads_read",
  },
  tiktok_ads: {
    client_id: process.env.TIKTOK_ADS_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/tiktok_ads/callback`,
    auth_url: "https://ads.tiktok.com/marketing_api/auth",
    scope: "ads.read",
  },
} as const;

const ALLOWED_PLATFORMS = Object.keys(oauthProviders);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
): Promise<NextResponse> {
  const { platform } = await context.params;

  if (!ALLOWED_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  const provider = oauthProviders[platform as keyof typeof oauthProviders];

  // Build OAuth URL
  const params = new URLSearchParams({
    client_id: provider.client_id,
    redirect_uri: provider.redirect_uri,
    response_type: "code",
    scope: provider.scope,
  });

  const authUrl = `${provider.auth_url}?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}
