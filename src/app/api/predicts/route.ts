import { NextResponse } from "next/server";
import * as ort from "onnxruntime-node";
import path from "path";
import fs from "fs/promises";

interface PredictionRequest {
  budget: number;
  impressions: number;
  clicks: number;
  platform: "google_ads" | "facebook_ads" | "tiktok_ads";
}

interface PredictionResponse {
  prediction: number;
  latency: number;
  modelVersion: string;
}

// 🔧 Path to model relative to project root
const MODEL_PATH = path.join(
  process.cwd(),
  "src/app/api/predicts/campaign_model.onnx"
);

let ortSession: ort.InferenceSession | null = null;

async function initializeModel() {
  try {
    await fs.access(MODEL_PATH);
    const session = await ort.InferenceSession.create(MODEL_PATH);
    console.log("✅ Model loaded from:", MODEL_PATH);
    return session;
  } catch (error) {
    console.error("❌ Model loading failed:", error);
    throw new Error(
      `Model loading failed. Ensure model exists at: ${MODEL_PATH}`
    );
  }
}

export async function POST(request: Request) {
  const startTime = performance.now();

  try {
    const { budget, impressions, clicks, platform } =
      (await request.json()) as PredictionRequest;

    if (isNaN(budget) || isNaN(impressions) || isNaN(clicks) || !platform) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (!ortSession) {
      ortSession = await initializeModel();
    }

    const inputTensor = new ort.Tensor(
      "float32",
      new Float32Array([
        Math.log1p(budget),
        Math.log1p(impressions),
        Math.log1p(clicks),
        platform === "google_ads"
          ? 1.2
          : platform === "facebook_ads"
          ? 1.0
          : 0.9,
      ]),
      [1, 4]
    );

    const feeds: Record<string, ort.Tensor> = {
      float_input: inputTensor,
    };

    const results = await ortSession.run(feeds);

    const latency = Math.round(performance.now() - startTime);

    return NextResponse.json({
      prediction: Number(results[ortSession.outputNames[0]].data[0]),
      latency,
      modelVersion: "1.0.0",
    } as PredictionResponse);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Prediction failed",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
        modelPath: MODEL_PATH,
      },
      { status: 500 }
    );
  }
}
export const config = {
  runtime: "edge", // Changed to edge runtime
  maxDuration: 30,
};
