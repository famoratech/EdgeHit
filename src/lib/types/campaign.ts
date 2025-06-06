// src/lib/types/campaign.ts
export type Campaign = {
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
