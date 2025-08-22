// // lib/storage.ts

// lib/storage.ts
import { supabase } from "@/lib/supabase";

export type PredictionLog = {
  id: string;
  user_id: string;
  date: string;
  platform: string;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: string;
};

// Save a prediction to Supabase
export async function logPrediction(entry: PredictionLog) {
  const { error } = await supabase.from("predictions").insert([entry]);
  if (error) throw error;
}

// Get all predictions for a user
export async function getAllPredictions(
  userId: string
): Promise<PredictionLog[]> {
  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Delete a prediction
export async function deletePrediction(id: string) {
  const { error } = await supabase.from("predictions").delete().eq("id", id);
  if (error) throw error;
}

// Export to CSV
export async function exportPredictionsToCSV(userId: string): Promise<string> {
  const data = await getAllPredictions(userId);
  const headers = [
    "date",
    "platform",
    "budget",
    "impressions",
    "clicks",
    "conversions",
    "roi",
  ];
  const rows = data.map((p) =>
    [
      p.date,
      p.platform,
      p.budget,
      p.impressions,
      p.clicks,
      p.conversions,
      p.roi,
    ].join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

// Generate a public URL for a Supabase Storage image

export function getPublicImageUrl(filename: string): string {
  const bucket = "blog-media"; // ✅ correct bucket name
  const projectRef = "ffpqnwdgctarhjikksnn"; // your project ref
  return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${filename}`;
}
