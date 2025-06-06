// import { pool } from "@/lib/db";

// export async function GET() {
//   const { rows } = await pool.query(`
//     SELECT id, name, month, year,
//            budget, impressions, clicks,
//            conversions, roi
//     FROM campaigns
//   `);
//   return Response.json(rows);
// }

import { pool } from "@/lib/db";

// Complete Type Definitions including conversions and ROI
type Campaign = {
  id: string;
  name: string;
  month: number;
  year: number;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
};

export type PredictionRequest = {
  features: [number, number, number]; // [impressions, clicks, budget]
};

export type PredictionResponse = {
  prediction: number;
  roi: number;
};

export async function GET() {
  try {
    // Optimized query that includes conversions and ROI
    const { rows } = await pool.query<Campaign>(`
      SELECT 
        id, 
        name, 
        month, 
        year, 
        budget, 
        impressions, 
        clicks,
        conversions,
        roi
      FROM campaigns
      WHERE year >= EXTRACT(YEAR FROM CURRENT_DATE) - 1
      ORDER BY year DESC, month DESC
      LIMIT 100  // Still limiting for performance
    `);

    return Response.json(rows, {
      headers: {
        "Cache-Control": "public, max-age=3600", // Maintain caching
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}
