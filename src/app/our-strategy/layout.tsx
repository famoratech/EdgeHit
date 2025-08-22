// app/strategy/layout.tsx
import { ReactNode } from "react";

export const metadata = {
  title: "Marketing Strategy | EdgeHit – Data-Driven Growth Framework",
  description:
    "Discover EdgeHit’s 4-phase strategic marketing framework: discovery, design, execution, and optimization. Tailored strategies that drive measurable growth.",
  keywords: [
    "marketing strategy",
    "digital strategy",
    "growth marketing framework",
    "EdgeHit methodology",
    "conversion optimization",
    "paid media strategy",
    "SEO and content strategy",
    "ROI-driven marketing",
  ],
  openGraph: {
    title: "EdgeHit Marketing Strategy – Data-Driven Framework",
    description:
      "From discovery to optimization, EdgeHit’s strategic approach delivers custom marketing systems built for sustainable growth.",
    url: "https://edgehit.ca/our-strategy",
    siteName: "EdgeHit",
    images: [
      {
        url: "https://edgehit.ca/images/ogimage.jpeg", // replace with your branded OG image
        width: 1200,
        height: 630,
        alt: "EdgeHit Strategy Framework",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Strategy | EdgeHit – Data-Driven Growth Framework",
    description:
      "Learn about EdgeHit’s proven 4-phase methodology: discovery, design, execution, and optimization. No generic campaigns—only measurable results.",
    images: ["https://edgehit.ca/images/ogimage.jpeg"],
  },
  alternates: {
    canonical: "https://edgehit.ca/our-strategy",
  },
};

export default function StrategyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
