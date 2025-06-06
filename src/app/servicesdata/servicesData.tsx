import React from "react";
import { BarChart3, Search, FileText, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

const services = [
  {
    anchorId: "content-management",

    icon: "🧩",
    iconImg: <FileText size={40} />,
    img: (
      <Image
        src="/contentR.png"
        alt="Digital Marketing Services"
        width={900}
        height={500}
        className="mx-auto rounded-lg shadow-md"
      />
    ),
    title: "Content Management",
    description:
      "We live and work online. Create a powerful presence on the web with an attractive and functional digital hub that reaches and engages customers.",
    features: [
      "Web Design & Development",
      "User Interface Design",
      "User Experience",
      "Prototyping",
      "E-Commerce",
      "App Design",
    ],
  },
  {
    anchorId: "SEO-Optimization",
    icon: "🔍",
    iconImg: <Search size={40} />,
    img: (
      <Image
        src="/SEOImgThree.png"
        alt="Digital Marketing Services"
        width={900}
        height={500}
        className="mx-auto rounded-lg shadow-md"
      />
    ),
    title: "SEO Optimization",
    description:
      "Make sure your digital health product is found by the right people at the right time. Improve visibility and drive organic growth with our strategic SEO services.",
    features: [
      "Keyword Research",
      "On-Page Optimization",
      "Technical SEO",
      "Content Optimization",
      "Link Building",
      "SEO Audits",
    ],
  },
  {
    anchorId: "social-campaign",
    icon: "📱",
    iconImg: <Users size={40} />,
    img: (
      <Image
        src="/socialCamp.webp"
        alt="Digital Marketing Services"
        width={900}
        height={500}
        className="mx-auto rounded-lg shadow-md"
      />
    ),
    title: "Social Media Campaign",
    description:
      "Engage, educate, and inspire with impactful social campaigns tailored to your health audience. Amplify your brand's voice on the right platforms.",
    features: [
      "Platform Strategy (Instagram, LinkedIn, etc.)",
      "Content Planning & Scheduling",
      "Creative Design",
      "Community Engagement",
      "Influencer Collaboration",
      "Performance Tracking",
    ],
  },
  {
    anchorId: "ads-optimization",
    icon: "📊",
    iconImg: <TrendingUp size={40} />,
    img: (
      <Image
        src="/ADSOptimizeImgOne.png"
        alt="Digital Marketing Services"
        width={900}
        height={500}
        className="mx-auto rounded-lg shadow-md"
      />
    ),
    title: "Ads Optimization",

    description:
      "Maximize ROI with expertly crafted and continuously optimized ad campaigns. Targeted outreach ensures your health solution reaches decision-makers.",
    features: [
      "Google Ads Management",
      "Meta Ads (Facebook/Instagram)",
      "A/B Testing",
      "Audience Segmentation",
      "Conversion Tracking",
      "Budget Management",
    ],
  },
  {
    anchorId: "performance analytics",
    icon: "📈",
    iconImg: <BarChart3 size={40} />,
    img: (
      <Image
        src="/performance.webp"
        alt="Digital Marketing Services"
        width={900}
        height={500}
        className="mx-auto rounded-lg shadow-md"
      />
    ),
    title: "Performance Analytics",
    description:
      "Turn data into actionable insights. We track what matters and deliver clear reporting so you can confidently adjust strategy and measure growth.",
    features: [
      "Custom Dashboarding",
      "Funnel & Goal Tracking",
      "User Behavior Analysis",
      "KPI Monitoring",
      "Insight Reports",
      "Predictive Analytics",
    ],
  },
];

export default services;
