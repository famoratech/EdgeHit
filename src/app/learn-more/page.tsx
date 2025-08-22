"use client";

import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import Link from "next/link";
import { useState } from "react";

// Define types for our components
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

interface TestimonialProps {
  className?: string;
}

// Icons with proper typing
const Rocket = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const Target = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const Brain = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const Chart = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const Integration = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Components with proper typing
const BenefitCard = ({
  icon,
  title,
  description,
  className = "",
}: BenefitCardProps) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}
  >
    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const HowItWorksStep = ({
  number,
  title,
  description,
  className = "",
}: HowItWorksStepProps) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}
  >
    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const FAQItem = ({ question, answer, className = "" }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Testimonial = ({ className = "" }: TestimonialProps) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}
  >
    <blockquote className="text-lg italic mb-4">
      &quot;Using this AI marketing analytics platform transformed our campaign
      performance. We saw a 38% increase in conversions while reducing wasted ad
      spend by 25% in just 3 months.&quot;
    </blockquote>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
      <div>
        <p className="font-semibold">Sarah Johnson</p>
        <p>Marketing Director, TechCorp</p>
      </div>
    </div>
  </div>
);

export default function LearnMorePage() {
  const { user, loading } = useSupabaseUser();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className=" rounded-2xl p-8 md:p-12 mb-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🚀 Unlock the Power of AI-Driven Marketing Analytics
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Transform Your Marketing Strategy with Intelligence
          </h2>
          <p className="text-lg mb-8">
            In today&apos;s competitive digital landscape, guessing is no longer
            an option. Our AI-powered Marketing Analytics Application helps you
            make data-driven decisions that maximize ROI, boost conversion
            rates, and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <CTAButton variant="primary">Sign Up Now Demo</CTAButton> */}
            {/* <CTAButton variant="secondary">Request Demo</CTAButton> */}
          </div>
          <div className="mt-8">
            {!loading && user ? (
              ""
            ) : (
              <a
                href="/auth"
                className="bg-[#FFA500] hover:bg-[#ffb733] font-['Montserrat'] font-bold text-white px-4 py-2 rounded"
              >
                Sign Up Now Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">🔍 What We Offer</h2>
        <p className="text-lg mb-6">
          Our platform uses advanced Machine Learning models to analyze your
          campaign data and predict key performance metrics such as:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center transition-transform hover:-translate-y-1">
            <Chart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold">Conversion Rate</h3>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center transition-transform hover:-translate-y-1">
            <Chart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold">
              Return on Investment (ROI)
            </h3>
          </div>
        </div>
        <p className="text-lg">
          By inputting simple campaign details like budget, platform, clicks,
          and impressions, you&apos;ll receive actionable insights that help you
          optimize your strategy before you even launch.
        </p>
      </section>

      {/* Key Benefits */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">💡 Key Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BenefitCard
            icon={<Target className="w-8 h-8 text-blue-600" />}
            title="Higher ROI"
            description="AI identifies the best-performing campaigns, reducing wasted spend."
          />
          <BenefitCard
            icon={<Brain className="w-8 h-8 text-blue-600" />}
            title="Accurate Predictions"
            description="Forecast conversions & ROI before launching ads."
          />
          <BenefitCard
            icon={<Clock className="w-8 h-8 text-blue-600" />}
            title="Time & Cost Savings"
            description="No more trial-and-error—optimize from day one."
          />
          <BenefitCard
            icon={<Rocket className="w-8 h-8 text-blue-600" />}
            title="Competitive Edge"
            description="Stay ahead with AI-powered insights competitors lack."
          />
          <BenefitCard
            icon={<Integration className="w-8 h-8 text-blue-600" />}
            title="Scalable Growth"
            description="Adapt strategies in real-time based on predictive analytics."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">🧠 How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HowItWorksStep
            number="1"
            title="Input Your Campaign Data"
            description="Enter your budget, platform, clicks, and impressions in seconds."
          />
          <HowItWorksStep
            number="2"
            title="AI-Powered Prediction Engine"
            description="Our machine learning model processes your data to forecast conversion rates & ROI with high accuracy."
          />
          <HowItWorksStep
            number="3"
            title="Insightful Recommendations"
            description="Get tailored suggestions to improve performance, allocate budget efficiently, and choose the best-performing platforms."
          />
          <HowItWorksStep
            number="4"
            title="Continuous Learning"
            description="The model evolves with your data, becoming smarter and more precise over time."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">
          📌 Learn More – Deep Dive into AI Marketing Analytics
        </h2>
        <div className="space-y-4">
          <FAQItem
            question="How Accurate Are the Predictions?"
            answer="Our ML model is trained on millions of data points from real campaigns, ensuring 85-95% prediction accuracy for conversion rates and ROI."
          />
          <FAQItem
            question="Can It Integrate with My Existing Tools?"
            answer="Yes! We support Google Ads, Meta, TikTok Ads, and more via API."
          />
          <FAQItem
            question="What If My Campaign Underperforms?"
            answer="Our AI provides real-time adjustments, suggesting bid changes, audience tweaks, and budget reallocations."
          />
          <FAQItem
            question="Is It Better Than Traditional Analytics?"
            answer="Traditional analytics look backward—AI predicts forward, giving you an edge in decision-making."
          />
        </div>
      </section>

      {/* Results & Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">
          📈 Real Results, Real Growth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              Up to 40% increase in conversion rates
            </h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              30% reduction in ad spend waste
            </h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              Significant improvements in campaign ROI
            </h3>
          </div>
        </div>
        <Testimonial />
      </section>

      {/* Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">🎓 Learn & Grow With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">📚 Blog</h3>
            <p>Tips, trends, and tutorials on AI in marketing</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">🎤 Webinars</h3>
            <p>Live sessions with industry experts</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">📂 Case Studies</h3>
            <p>See how businesses like yours succeeded</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">🛠️ Support Center</h3>
            <p>Get help when you need it</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join the future of marketing. Let AI guide your strategy and unlock
          your business&apos;s full potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <CTAButton variant="primary">Sign Up Now</CTAButton>
          <CTAButton variant="secondary">Request Demo</CTAButton> */}

          {!loading && user ? (
            ""
          ) : (
            // <button
            //   onClick={() => {
            //     // handleLogout();
            //     // handleLinkClick();
            //   }}
            //   className="block w-full text-left hover:text-red-400"
            // >
            //   Log Out
            // </button>
            // <Link href="/auth">
            //   <CTAButton variant="primary">Sign Up Now For Demo</CTAButton>
            // </Link>

            <a
              href="/auth"
              className="bg-[#FFA500] hover:bg-[#ffb733] font-['Montserrat'] font-bold text-white px-4 py-2 rounded"
            >
              Sign Up Now For Demo
            </a>
          )}

          {/* <Link href="/auth">
            <CTAButton variant="primary">Contact Sales</CTAButton>
          </Link> */}

          <Link
            href="/#contact-form"
            className="bg-[#FFA500] hover:bg-[#ffb733] font-['Montserrat'] font-bold text-white px-4 py-2 rounded"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
