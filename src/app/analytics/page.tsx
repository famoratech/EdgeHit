"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load components with loading states
const ChartComponent = dynamic(() => import("@/components/chart/chart"), {
  loading: () => <div className="p-4 text-center">Loading chart...</div>,
  ssr: false,
});

const CampaignForm = dynamic(() => import("@/components/forms/campaignForm"), {
  loading: () => <div className="p-4 text-center">Loading form...</div>,
  ssr: false,
});

// Static data - consider fetching in component if dynamic
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Conversions",
      data: [12, 19, 3, 8, 15, 7],
      backgroundColor: "#3b82f6",
    },
  ],
};

export default function AnalyticsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {" "}
        {/* Reduced size */}
        Campaign Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {" "}
        {/* Simplified layout */}
        <Suspense fallback={<div>Loading campaign tools...</div>}>
          <div className="bg-white p-4 rounded-lg shadow">
            <CampaignForm />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
            <ChartComponent data={chartData} />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
