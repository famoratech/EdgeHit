"use client";
// import { Prediction } from "@/lib/types"; // Adjust the import path

interface PredictionData {
  id: string;
  date: string;
  platform: string;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: string | number;
}

interface PredictionTableProps {
  data: PredictionData[];
}
export default function PredictionTable({ data }: PredictionTableProps) {
  if (data.length === 0) return <p>No predictions to display.</p>;

  return (
    <table className="w-full text-sm text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-2 py-1">Date</th>
          <th className="px-2 py-1">Platform</th>
          <th className="px-2 py-1">Budget</th>
          <th className="px-2 py-1">Impressions</th>
          <th className="px-2 py-1">Clicks</th>
          <th className="px-2 py-1">Conversions</th>
          <th className="px-2 py-1">ROI</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-t">
            <td className="px-2 py-1">{row.date}</td>
            <td className="px-2 py-1">{row.platform}</td>
            <td className="px-2 py-1">${row.budget}</td>
            <td className="px-2 py-1">{row.impressions}</td>
            <td className="px-2 py-1">{row.clicks}</td>
            <td className="px-2 py-1">{row.conversions}</td>
            <td className="px-2 py-1">{row.roi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
