"use client";
import { exportPredictionsToCSV } from "@/lib/storage";

export default function ExportButton({ userId }: { userId: string }) {
  const handleExport = async () => {
    const csv = await exportPredictionsToCSV(userId);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `predictions_${new Date().toISOString()}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Export CSV
    </button>
  );
}
