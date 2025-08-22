import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PLATFORMS = ["google_ads", "facebook_ads", "tiktok_ads"];

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
): Promise<NextResponse> {
  const { platform } = await context.params;

  if (!ALLOWED_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No code returned from provider" },
      { status: 400 }
    );
  }

  try {
    // TODO: Exchange code for access token using provider credentials
    // Example: call Supabase or provider API to store token
    return NextResponse.json({
      message: `OAuth callback received for ${platform}`,
      code,
    });
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
