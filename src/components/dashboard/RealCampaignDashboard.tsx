"use client";
import { useEffect, useState } from "react";
import { fetchRealCampaignData } from "@/lib/ads/google"; // Change for each platform
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface CampaignData {
  date: string;
  roi: number;
  // Add other possible properties if needed
  [key: string]: string | number;
}

export default function RealCampaignDashboard({ userId }: { userId: string }) {
  const [data, setData] = useState<CampaignData[]>([]);

  useEffect(() => {
    async function load() {
      const realData = await fetchRealCampaignData();
      setData(realData);
    }
    load();
  }, [userId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Live Campaign Analytics</h2>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="roi" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
