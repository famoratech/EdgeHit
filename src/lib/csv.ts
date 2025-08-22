// import { getAllPredictions } from "./storage";

import { getAllPredictions } from "./storage";

export async function exportToCSV(userId: string) {
  const data = await getAllPredictions(userId);
  const header = Object.keys(data[0] || {}).join(",");
  const rows = data.map((d) => Object.values(d).join(",")).join("\n");
  const blob = new Blob([header + "\n" + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "campaign_predictions.csv";
  a.click();
  URL.revokeObjectURL(url);
}
