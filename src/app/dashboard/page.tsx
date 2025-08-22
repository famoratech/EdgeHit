// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import RealCampaignDashboard from "@/components/dashboard/RealCampaignDashboard";
import PredictionDashboard from "@/components/dashboard/PredictionDashboard";
import ConnectAdAccountButton from "@/components/buttons/ConnectAdAccountButton";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useSupabaseUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4 bg-gray-50">
      <div className="w-full max-w-5xl md:w-4/5 bg-white shadow-lg rounded-lg p-6 space-y-10">
        {" "}
        <div className="text-right mb-6">
          <Link
            href="/predict"
            className="bg-blue-600 text-white p-2.5 rounded hover:bg-blue-700 transition-colors"
          >
            Predict Campaign Performance
          </Link>
        </div>
        <RealCampaignDashboard userId={user.id} />
        <PredictionDashboard userId={user.id} />
        <div className="space-y-4 p-6">
          <h1 className="text-xl font-bold">Connect Your Ad Accounts</h1>
          <ConnectAdAccountButton platform="google_ads" />
          &nbsp;&nbsp;
          <ConnectAdAccountButton platform="facebook_ads" />
          &nbsp;&nbsp;
          <ConnectAdAccountButton platform="tiktok_ads" />
        </div>
      </div>
    </div>
  );
}
