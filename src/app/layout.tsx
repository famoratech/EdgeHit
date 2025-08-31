import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";
import GoogleAnalytics from "@/components/googleanalytics/googleAnalytics";
import GoogleAds from "@/components/googleAds/googleAds";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EDGHIT | Digital Marketing, App Development & Content Creation",
  description:
    "EDGHIT is your partner in digital growth. We specialize in AI-powered data-driven digital marketing, custom app development, and content creation to help your brand thrive online.",
  keywords: [
    "digital marketing",
    "app development",
    "content creation",
    "SEO",
    "branding",
    "web design",
    "mobile apps",
    "consultant",
    "digital health",
    "social media marketing",
    "edghit",
  ],
  metadataBase: new URL("https://edgehit.ca"),
  openGraph: {
    title: "EDGHIT | Digital Marketing, App Development & Content Creation",
    description:
      "Grow your business with EDGHIT. We deliver expert digital marketing, innovative app development, and compelling content strategies.",
    url: "https://edgehit.ca",
    siteName: "EDGHIT",
    images: [
      {
        url: "https://edgehit.ca/images/ogimage.jpeg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "EDGHIT - Digital Solutions",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EDGHIT | Digital Marketing, App Development & Content Creation",
    description:
      "Expert digital marketing, app development, and content creation services to elevate your brand.",
    images: ["https://edgehit.ca/images/ogimage.jpg"], // Replace with your actual image
    creator: "@edghit", // Optional: your Twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Any additional metadata or styles can go here */}
        <GoogleAnalytics />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAds />
        <Navbar />
        {children}
        <Toaster position="top-center" richColors /> {/* 👈 Add this */}
        <Footer />
      </body>
    </html>
  );
}
