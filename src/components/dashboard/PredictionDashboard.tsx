"use client";

import { useEffect, useState } from "react";
import { getAllPredictions, exportPredictionsToCSV } from "@/lib/storage";
import { PredictionLog } from "@/lib/storage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Modal from "@/components/ui/modal";

interface Props {
  userId: string;
}

const ITEMS_PER_PAGE = 5;

export default function PredictionDashboard({ userId }: Props) {
  const [data, setData] = useState<PredictionLog[]>([]);
  const [filtered, setFiltered] = useState<PredictionLog[]>([]);
  const [platform, setPlatform] = useState<"all" | PredictionLog["platform"]>(
    "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);
  const [csvData, setCsvData] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const predictions = await getAllPredictions(userId);
        setData(predictions);
      } catch (err: unknown) {
        setError("Failed to load predictions.");
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        console.error("Error loading predictions:", errorMessage);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  useEffect(() => {
    const filtered =
      platform === "all" ? data : data.filter((d) => d.platform === platform);
    setFiltered(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [platform, data]);

  const avgROI = filtered.length
    ? (
        filtered.reduce((acc, d) => acc + parseFloat(d.roi), 0) /
        filtered.length
      ).toFixed(2)
    : "0";

  const totalConversions = filtered.length;

  const bestPlatform = filtered.reduce((acc, d) => {
    acc[d.platform] = (acc[d.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topPlatform =
    Object.entries(bestPlatform).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExport = async () => {
    const csv = await exportPredictionsToCSV(userId);
    setCsvData(csv);
    setShowExportModal(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Predictions</h2>

      {/* Summary cards */}
      <div className="flex flex-wrap gap-4">
        <div className="bg-gray-100 p-4 rounded w-48 dark:bg-gray-800">
          <h2 className="font-semibold">Avg ROI</h2>
          <p>${avgROI}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded w-48 dark:bg-gray-800">
          <h2 className="font-semibold">Conversions</h2>
          <p>{totalConversions}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded w-48 dark:bg-gray-800">
          <h2 className="font-semibold">Best Platform</h2>
          <p>{topPlatform}</p>
        </div>
      </div>

      {/* Filter and export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="mr-2">Filter:</label>
          <select
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value as "all" | PredictionLog["platform"])
            }
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="google_ads">Google Ads</option>
            <option value="facebook_ads">Facebook Ads</option>
            <option value="tiktok_ads">TikTok Ads</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="roi" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Platform</th>
              <th className="px-3 py-2">Budget</th>
              <th className="px-3 py-2">Impressions</th>
              <th className="px-3 py-2">Clicks</th>
              <th className="px-3 py-2">Conversions</th>
              <th className="px-3 py-2">ROI</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2">{p.date}</td>
                <td className="px-3 py-2">{p.platform}</td>
                <td className="px-3 py-2">${p.budget}</td>
                <td className="px-3 py-2">{p.impressions}</td>
                <td className="px-3 py-2">{p.clicks}</td>
                <td className="px-3 py-2">{p.conversions}</td>
                <td className="px-3 py-2">${p.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        {Array.from({
          length: Math.ceil(filtered.length / ITEMS_PER_PAGE),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              i + 1 === currentPage ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Exported CSV"
      >
        <textarea
          value={csvData}
          readOnly
          className="w-full h-40 border p-2 text-xs"
        />
      </Modal>

      {loading && <p className="text-sm">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
