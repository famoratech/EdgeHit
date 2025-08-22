"use client";

import CampaignPredictor from "@/components/campaignPredictor/CampaignPredictor";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

export default function PredictPage() {
  const { user, loading } = useSupabaseUser({ redirectTo: "/auth" });
  if (loading || !user) return <p>Loading...</p>;

  return (
    <div>
      <CampaignPredictor user={user} />
    </div>
  );
}
