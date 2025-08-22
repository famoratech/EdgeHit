// app/api/oauth/facebook_ads/route.ts
import { NextResponse } from "next/server";

const facebookOAuthURL = new URL("https://www.facebook.com/v19.0/dialog/oauth");

export function GET() {
  facebookOAuthURL.searchParams.set(
    "client_id",
    process.env.FACEBOOK_ADS_CLIENT_ID!
  );
  facebookOAuthURL.searchParams.set(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/facebook_ads/callback`
  );
  facebookOAuthURL.searchParams.set("response_type", "code");
  facebookOAuthURL.searchParams.set("scope", "ads_read");

  return NextResponse.redirect(facebookOAuthURL.toString());
}
