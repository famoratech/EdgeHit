//
"use client";
import { useState } from "react";

type FormData = {
  budget: string;
  impressions: string;
  clicks: string;
  platform: "google_ads" | "facebook_ads" | "tiktok_ads";
};

type PredictionResult = {
  prediction: number;
  latency?: number;
  modelVersion?: string;
};

export default function CampaignForm() {
  const [formData, setFormData] = useState<FormData>({
    budget: "",
    impressions: "",
    clicks: "",
    platform: "google_ads",
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/predicts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: Number(formData.budget),
          impressions: Number(formData.impressions),
          clicks: Number(formData.clicks),
          platform: formData.platform,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateROI = (predictedConversions: number, budget: number) => {
    // Assuming $10 value per conversion
    const revenue = predictedConversions * 10;
    return ((revenue - budget) / budget) * 100;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Platform Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platform
            </label>
            <select
              value={formData.platform}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  platform: e.target.value as
                    | "google_ads"
                    | "facebook_ads"
                    | "tiktok_ads",
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="google_ads">Google Ads</option>
              <option value="facebook_ads">Facebook Ads</option>
              <option value="tiktok_ads">TikTok Ads</option>
            </select>
          </div>

          {/* Impressions Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Impressions
            </label>
            <input
              type="number"
              min="0"
              value={formData.impressions}
              onChange={(e) =>
                setFormData({ ...formData, impressions: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Clicks Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clicks
            </label>
            <input
              type="number"
              min="0"
              value={formData.clicks}
              onChange={(e) =>
                setFormData({ ...formData, clicks: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Predicting...
            </span>
          ) : (
            "Predict Conversions"
          )}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Prediction Results
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Predicted Conversions:</span>
              <span className="font-medium">
                {result.prediction.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated ROI:</span>
              <span
                className={`font-medium ${
                  calculateROI(result.prediction, Number(formData.budget)) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {calculateROI(
                  result.prediction,
                  Number(formData.budget)
                ).toFixed(2)}
                %
              </span>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-200 text-sm text-gray-500">
              <p>
                Model v{result.modelVersion} • {result.latency}ms
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
