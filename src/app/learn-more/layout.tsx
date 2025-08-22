import { ReactNode } from "react";

export const metadata = {
  title: "AI Marketing Analytics | Predict ROI & Conversions",
  description:
    "Unlock the power of AI-driven marketing analytics. Predict conversion rates, maximize ROI, and optimize ad spend with actionable insights before launching campaigns.",
  keywords: [
    "AI marketing analytics",
    "predict conversions",
    "ROI prediction",
    "digital marketing AI",
    "campaign optimization",
    "machine learning marketing",
    "predictive analytics for ads",
    "increase conversions",
    "reduce ad spend waste",
  ],
  openGraph: {
    title: "AI Marketing Analytics – Predict ROI & Conversions",
    description:
      "Transform your marketing strategy with AI-powered analytics. Forecast conversions & ROI, reduce wasted spend, and scale smarter.",
    url: "https://edgehit.ca/learn-more",
    siteName: "YourAppName",
    images: [
      {
        url: "https://edgehit.ca/images/ogimage.jpeg",
        width: 1200,
        height: 630,
        alt: "AI Marketing Analytics Dashboard Preview for your campaigns",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Analytics – Predict ROI & Conversions",
    description:
      "Boost your marketing campaigns with AI. Predict ROI, optimize spend, and improve conversions with predictive analytics.",
    images: ["https://edgehit.ca/images/ogimage.jpeg"],
  },
  alternates: {
    canonical: "https://edgehit.ca/learn-more",
  },
};

export default function LearnMoreLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
