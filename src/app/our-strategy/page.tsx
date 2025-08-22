// app/strategy/page.tsx
"use client";

import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { motion } from "framer-motion";

export default function StrategyPage() {
  const { user, loading } = useSupabaseUser();

  const strategyData = [
    {
      title: "Discovery Phase",
      icon: "🔍",
      description:
        "Deep dive into your business objectives and market position",
      steps: [
        "Comprehensive business audit",
        "Competitor landscape analysis",
        "Target audience profiling",
        "SWOT evaluation",
      ],
    },
    {
      title: "Strategy Design",
      icon: "📐",
      description: "Custom marketing blueprint development",
      steps: [
        "Channel selection matrix",
        "Content framework creation",
        "Conversion funnel mapping",
        "KPI establishment",
      ],
    },
    {
      title: "Execution",
      icon: "⚡",
      description: "Precision implementation of your strategy",
      steps: [
        "Campaign deployment",
        "Content production",
        "Technical implementation",
        "Team onboarding",
      ],
    },
    {
      title: "Optimization",
      icon: "📈",
      description: "Continuous performance enhancement",
      steps: [
        "A/B testing regimen",
        "Data-driven refinements",
        "Emerging trend integration",
        "ROI maximization",
      ],
    },
  ];

  const solutions = [
    {
      title: "Paid Media Strategy",
      icon: "💰",
      features: [
        "Platform-specific campaign architectures",
        "Audience segmentation models",
        "Bid optimization algorithms",
        "Creative testing frameworks",
      ],
    },
    {
      title: "Organic Growth",
      icon: "🌱",
      features: [
        "SEO roadmap development",
        "Content ecosystem planning",
        "Community engagement protocols",
        "Influencer partnership strategies",
      ],
    },
    {
      title: "Conversion Engineering",
      icon: "🔄",
      features: [
        "UX audit & optimization",
        "Personalization frameworks",
        "Behavioral trigger mapping",
        "Testing methodology",
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Strategic Approach
          </h1>
          <p className="text-lg  max-w-3xl mx-auto">
            Data-driven marketing strategies tailored to your unique business
            needs - no generic solutions, just measurable results.
          </p>
        </motion.div>

        {/* Core Methodology */}
        <motion.section
          //   variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The EdgeHit Methodology</h2>
            <p className=" max-w-2xl mx-auto">
              Our 4-phase framework ensures strategic alignment at every stage
              of your growth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategyData.map((phase, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
                <p className="mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.steps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-2">{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Solutions Showcase - Icon Only Version */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Strategic Solutions</h2>
            <p className=" max-w-2xl mx-auto">
              Comprehensive marketing systems designed for your specific
              objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="text-5xl mb-6 text-center">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {solution.title}
                </h3>
                <ul className="space-y-3">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Comparison Section */}
        <motion.section
          //   variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Our Approach Wins
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Traditional Approach
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    EdgeHit Strategy
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    traditional: "Generic campaign templates",
                    edgehit: "Custom-built marketing systems",
                  },
                  {
                    traditional: "Fixed quarterly plans",
                    edgehit: "Agile monthly sprints",
                  },
                  {
                    traditional: "Vanity metric reporting",
                    edgehit: "ROI-focused analytics",
                  },
                  {
                    traditional: "Single-channel specialists",
                    edgehit: "Integrated cross-channel experts",
                  },
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {row.traditional}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                      {row.edgehit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Marketing?
          </h3>
          <p className="text-lg  mb-8 max-w-2xl mx-auto">
            Let&apos;s build a strategy that delivers real business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div className="mt-8">
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
            </motion.div>
            <motion.a
              href="/#contact-form"
              className="inline-block bg-white text-[#FFA500] font-bold py-3 px-6 rounded-lg border-2 border-[#FFA600] hover:bg-blue-50 transition font-['Montserrat']"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Sales
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
