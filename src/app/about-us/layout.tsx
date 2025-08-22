import { ReactNode } from "react";

export const metadata = {
  title: "About Us | EdgeHit – Your Growth Partner",
  description:
    "Learn about EdgeHit — a human-first, data-driven digital marketing agency. We partner with businesses in health, education, e-commerce, nonprofits, and more to drive meaningful growth.",
  keywords: [
    "About EdgeHit",
    "digital marketing agency",
    "growth partner",
    "data-driven marketing",
    "creative marketing strategies",
    "marketing for startups",
    "marketing for nonprofits",
    "AI marketing agency",
    "EdgeHit team",
  ],
  openGraph: {
    title: "About Us | EdgeHit – Your Growth Partner",
    description:
      "We’re more than just a digital marketing agency — we’re your growth partner. Discover our culture, values, and the industries we serve.",
    url: "https://edgehit.ca/about",
    siteName: "EdgeHit",
    images: [
      {
        url: "https://edgehit.ca/images/ogimage.jpeg", // replace with a branded OG image
        width: 1200,
        height: 630,
        alt: "EdgeHit Team – About Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | EdgeHit – Your Growth Partner",
    description:
      "Meet EdgeHit: a creative, data-backed marketing agency helping businesses grow across health, education, e-commerce, and more.",
    images: ["https://edgehit.ca/images/ogimage.jpeg"], // replace with a branded OG image
  },
  alternates: {
    canonical: "https://edgehit.ca/about-us",
  },
};
// Layout component
export default function AboutUsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
