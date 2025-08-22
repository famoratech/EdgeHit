import { ReactNode } from "react";
export const metadata = {
  title: "Our Services | EdgeHit Digital Marketing",
  description:
    "Explore the full range of services offered by EdgeHit Digital Marketing, from strategy and paid media to organic growth and conversion optimization.",
  keywords: [
    "digital marketing services",
    "EdgeHit strategy",
    "paid media",
    "SEO services",
    "conversion optimization",
    "marketing solutions",
  ],
  authors: [{ name: "EdgeHit Digital Marketing" }],
  creator: "EdgeHit Digital Marketing",
  openGraph: {
    title: "Our Services | EdgeHit Digital Marketing",
    description:
      "Discover how EdgeHit Digital Marketing helps businesses grow through tailored strategies and expert marketing services.",
    url: "https://www.edgehit.ca/services",
    siteName: "EdgeHit Digital Marketing",
    images: [
      {
        url: "https://www.edgehit.ca/images/ogimage.jpeg",
        width: 1200,
        height: 630,
        alt: "EdgeHit services showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | EdgeHit Digital Marketing",
    description:
      "Explore the services offered by EdgeHit Digital Marketing to accelerate business growth.",
    images: ["https://www.edgehit.ca/images/ogimage.jpeg"],
    creator: "@EdgeHitMarketing",
  },
};
// Layout component
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
