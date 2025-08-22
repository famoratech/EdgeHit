"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUs() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const partners = [
    { label: "Health & Wellness", icon: `/images/welness.png` },
    { label: "Education", icon: "/images/education.png" },
    { label: "Nonprofits", icon: "/images/nonprofit.png" },
    { label: "Public Services", icon: "/images/public.png" },
    { label: "E-commerce", icon: "/images/ecommerce.png" },
    { label: "Startups", icon: "/images/startupss.png" },
  ];

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 text-gray-800 py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We’re more than just a digital marketing agency — we’re your growth
            partner.
          </p>
        </motion.div>
        {/* Intro Section with Image */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-16"
        >
          {/* Image with 3:2 aspect ratio (1.5x width vs height) */}
          <div className="relative w-full max-w-[500px] mb-8 mx-auto aspect-[3/2]">
            <Image
              src="/images/teamwork.png"
              alt="Teamwork illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Centered paragraphs */}
          <div className="space-y-5 text-gray-700 text-base md:text-lg text-center max-w-2xl mx-auto">
            <p>
              Born from a passion for helping businesses thrive online,{" "}
              <span className="font-semibold">EdgeHit</span> is built on
              collaboration, creativity, and data-driven strategies.
            </p>
            <p>
              Whether you're a healthcare innovator, e-commerce brand, or
              education provider, we tailor every project to meet your unique
              goals. No off-the-shelf solutions — just meaningful strategies,
              crafted with care.
            </p>
          </div>
        </motion.div>
        {/* What Makes Us Different */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-4">
            What Makes Us Different?
          </h2>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>
              <span className="font-medium">Human-first, data-backed:</span> We
              combine creativity with analytics to drive results.
            </li>
            <li>
              <span className="font-medium">Agile & adaptive:</span> We work
              fast, stay flexible, and grow with you.
            </li>
            <li>
              <span className="font-medium">End-to-end support:</span> From
              concept to execution — we’re with you all the way.
            </li>
            <li>
              <span className="font-medium">Transparent partnerships:</span> We
              lead with clarity, trust, and open communication.
            </li>
          </ul>
        </motion.div>
        {/* Who We Work With (with icons/images) */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Who We Work With
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 xl:gap-y-30 l:gap-y-30 md:gap-y-30 gap-y-10">
            {partners.map(({ label, icon }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center space-y-4   transition duration-300"
              >
                <div className="overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={icon}
                    alt={label}
                    width={160}
                    height={160}
                    className="grayscale-0 hover:grayscale transition duration-500 ease-in-out object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Culture */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Culture</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Coffee-fueled creativity ☕</li>
            <li>Collaborative problem-solving 🤝</li>
            <li>Long-term client partnerships 💡</li>
            <li>Ping-pong breaks and productivity 🎯</li>
          </ul>
        </motion.div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-xl font-semibold mb-2">
            Let’s grow your digital edge — together.
          </h3>
          <p className="mb-6 text-gray-600">
            We’d love to hear your story and see how we can help.
          </p>
          <a
            href="/#contact-form"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
