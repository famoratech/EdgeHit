"use client";

import { useCallback, useEffect, useState } from "react";
import {
  logPrediction,
  getAllPredictions,
  deletePrediction,
} from "@/lib/storage";
import * as ort from "onnxruntime-web";
import Modal from "@/components/ui/modal";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

interface Props {
  user: User;
}
interface PredictionLog {
  id: string;
  date: string;
  platform: string;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: string;
  user_id: string;
}
export default function CampaignPredictor({ user }: Props) {
  const [input, setInput] = useState({
    budget: 1000,
    impressions: 5000,
    clicks: 300,
    platform: "google_ads",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState({
    conversions: 0,
    roi: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<PredictionLog[]>([]);

  const [modelUrl, setModelUrl] = useState("");

  useEffect(() => {
    setModelUrl(
      `https://raw.githubusercontent.com/famoratech/EdgeHit/main/src/.model-storage/campaign_model.onnx?ts=${Date.now()}`
    );
  }, []);

  const loadPredictions = useCallback(async () => {
    try {
      const entries = await getAllPredictions(user.id);
      setLogs(entries);
    } catch (err) {
      console.error("Failed to load logs:", err);
    }
  }, [user.id]);

  useEffect(() => {
    loadPredictions();
  }, [loadPredictions]);

  // async function loadPredictions() {
  //   try {
  //     const entries = await getAllPredictions(user.id);
  //     setLogs(entries);
  //   } catch (err) {
  //     console.error("Failed to load logs:", err);
  //   }
  // }

  const handlePredict = async () => {
    const { budget, impressions, clicks, platform } = input;
    if (!budget || !impressions || !clicks) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const session = await ort.InferenceSession.create(modelUrl, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      });

      const platformFactor =
        platform === "google_ads"
          ? 1.2
          : platform === "facebook_ads"
          ? 1.0
          : 0.9;

      const inputTensor = new ort.Tensor(
        "float32",
        new Float32Array([
          Math.log1p(budget),
          Math.log1p(impressions),
          Math.log1p(clicks),
          platformFactor,
        ]),
        [1, 4]
      );

      const feeds: Record<string, ort.Tensor> = {};
      feeds[session.inputNames[0]] = inputTensor;
      const results = await session.run(feeds);
      const conversions = results[session.outputNames[0]].data[0] as number;

      const roi = ((conversions * 100) / budget).toFixed(2);

      setPredictionResult({ conversions, roi: parseFloat(roi) });
      setModalOpen(true);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const confirmAndLog = async () => {
    const { budget, impressions, clicks, platform } = input;
    const { conversions, roi } = predictionResult;

    const entry: PredictionLog = {
      id: uuidv4(),
      date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      platform,
      budget,
      impressions,
      clicks,
      conversions: Math.round(conversions),
      roi: roi.toString(),
      user_id: user.id,
    };

    try {
      await logPrediction(entry);
      await loadPredictions();
    } catch (err) {
      console.error("Logging error:", err);
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePrediction(id);
      await loadPredictions();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-screen-xl" style={{ width: "80%" }}>
        <div className="bg-white p-6 rounded-lg shadow space-y-8">
          <div className="text-right mb-6">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white p-2.5 rounded hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Predict Campaign Conversions
          </h1>
          {/* Form */}
          <div className="space-y-4 grid md:grid-cols-2 gap-4">
            {["budget", "impressions", "clicks"].map((field) => (
              <label key={field} className="block">
                {field[0].toUpperCase() + field.slice(1)}
                <input
                  type="number"
                  value={input[field as keyof typeof input]}
                  onChange={(e) =>
                    setInput({ ...input, [field]: Number(e.target.value) })
                  }
                  className="w-full border rounded px-3 py-1"
                />
              </label>
            ))}

            <label className="block">
              Platform
              <select
                value={input.platform}
                onChange={(e) =>
                  setInput({ ...input, platform: e.target.value })
                }
                className="w-full border rounded px-3 py-1"
              >
                <option value="google_ads">Google Ads</option>
                <option value="facebook_ads">Facebook Ads</option>
                <option value="tiktok_ads">TikTok Ads</option>
              </select>
            </label>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {/* Modal */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Prediction Result"
          >
            <p>
              <strong>Predicted Conversions:</strong>{" "}
              {predictionResult.conversions.toFixed(2)}
            </p>
            <p>
              <strong>Predicted ROI:</strong> {predictionResult.roi.toFixed(2)}
            </p>
            <button
              onClick={confirmAndLog}
              className="mt-4 bg-green-600 px-4 py-2 text-white rounded"
            >
              OK
            </button>
          </Modal>

          {/* Table */}
          <div>
            <h2 className="font-bold text-lg mb-2">Prediction Logs</h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1">Date</th>
                    <th>Platform</th>
                    <th>Budget</th>
                    <th>Impr.</th>
                    <th>Clicks</th>
                    <th>Conv.</th>
                    <th>ROI</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="text-center border-t">
                      <td>{log.date}</td>
                      <td>{log.platform}</td>
                      <td>${log.budget}</td>
                      <td>{log.impressions}</td>
                      <td>{log.clicks}</td>
                      <td>{log.conversions}</td>
                      <td>{log.roi}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!logs.length && (
                    <tr>
                      <td colSpan={8} className="text-center py-2">
                        No logs yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
