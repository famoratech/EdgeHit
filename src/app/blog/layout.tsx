import { ReactNode } from "react";

export const metadata = {
  title: "Insights & Articles | My Blog",
  description:
    "Explore expert insights, tutorials, and articles on web development, design, and technology.",
  keywords: ["web development", "design", "technology", "blog", "articles"],
  openGraph: {
    title: "Insights & Articles | My Blog",
    description:
      "Explore expert insights, tutorials, and articles on web development, design, and technology.",
    url: "https://edgehit.ca/blog",
    images: [
      {
        url: "https://edgehit.ca/images/ogimage.jpeg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Blog cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Articles | My Blog",
    description:
      "Explore expert insights, tutorials, and articles on web development, design, and technology.",
    images: ["https://edgehit.ca/images/ogimage.jpeg"], // Replace with your actual image
  },
};
export default function BlogPage({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
