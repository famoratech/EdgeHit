import { NextResponse } from "next/server";
import { InferenceSession, Tensor } from "onnxruntime-web";

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

// GitHub raw content URL with cache busting
const GITHUB_MODEL_URL = `https://github.com/famoratech/EdgeHit/blob/main/src/.model-storage/campaign_model.onnx?ts=${Date.now()}`;

let ortSession: InferenceSession | null = null;

async function initializeModel() {
  try {
    console.log(`Fetching model from GitHub: ${GITHUB_MODEL_URL}`);

    const response = await fetch(GITHUB_MODEL_URL, {
      headers: process.env.GITHUB_TOKEN
        ? {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }
        : {},
    });

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const modelBuffer = await response.arrayBuffer();
    console.log(`Model loaded (${modelBuffer.byteLength} bytes)`);

    return await InferenceSession.create(modelBuffer, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
  } catch (error) {
    console.error("Model initialization failed:", error);
    throw new Error(
      `Failed to load model from GitHub. ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function POST(request: Request) {
  const startTime = performance.now();

  try {
    const { budget, impressions, clicks, platform } =
      (await request.json()) as PredictionRequest;

    // Validate input
    if ([budget, impressions, clicks].some(isNaN) || !platform) {
      throw new Error("Invalid input parameters");
    }

    // Initialize model (cached)
    if (!ortSession) {
      ortSession = await initializeModel();
      console.log("ONNX session initialized");
    }

    // Prepare input tensor (matches training preprocessing)
    const inputTensor = new Tensor(
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

    // Run prediction
    const results = await ortSession.run({
      [ortSession.inputNames[0]]: inputTensor,
    });

    const prediction = results[ortSession.outputNames[0]].data[0];
    const latency = Math.round(performance.now() - startTime);

    return NextResponse.json({
      prediction: Number(prediction),
      latency,
      modelVersion: "1.0.0",
    } as PredictionResponse);
  } catch (error) {
    console.error("Prediction error:", error);

    return NextResponse.json(
      {
        error: "Prediction failed",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : "Internal server error",
        troubleshooting: [
          `1. Verify model exists at: ${GITHUB_MODEL_URL}`,
          "2. Check repository visibility (public/private)",
          "3. For private repos, set GITHUB_TOKEN environment variable",
        ],
      },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: "edge",
  maxDuration: 30,
};
