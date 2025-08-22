"use client";

import React from "react";

const PLATFORM_AUTH_URLS: Record<string, string> = {
  google_ads: "/api/oauth/google_ads",
  facebook_ads: "/api/oauth/facebook_ads",
  tiktok_ads: "/api/oauth/tiktok_ads",
};

interface Props {
  platform: keyof typeof PLATFORM_AUTH_URLS;
  label?: string;
}

export default function ConnectAdAccountButton({ platform, label }: Props) {
  const handleClick = () => {
    const authUrl = PLATFORM_AUTH_URLS[platform];
    if (authUrl) {
      window.location.href = authUrl;
    } else {
      alert("Unsupported platform");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {label || `Connect ${platform.replace("_", " ")}`}
    </button>
  );
}
