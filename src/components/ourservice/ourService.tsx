"use client";
import React from "react";
import { motion } from "framer-motion";
// import { BarChart3, Search, FileText, Users, TrendingUp } from "lucide-react";
import services from "@/app/servicesdata/servicesData";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CalendlyWidget from "../calendar/calendar";

const OurService = () => {
  return (
    <section className="bg-gray-50 py-12 text-[#284F6C]">
      <div className="w-[55%] mx-auto text-center">
        {/* Section Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Increase your customer base with our personalized strategies tailored
          to fuel your business growth.
        </p>

        {/* Flex layout for icons */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-25 lg:gap-50 mb-12"
        >
          {services.map((service, index) => (
            <Link href={`/services#${service.anchorId}`} key={index}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                key={index}
                className="group relative flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer w-[150px]"
              >
                <div className="text-[#FFA500] mb-2">{service.iconImg}</div>
                <p className="text-sm font-medium text-center leading-tight break-words w-[100px]">
                  {service.title}
                </p>

                {/* Learn More Tooltip */}
                <div className="absolute bottom-[-1.5rem] opacity-0 group-hover:opacity-100 text-[12px] bg-[#284F6C] text-white px-2 py-1 rounded transition duration-300">
                  Learn more
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Illustration Row */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full mt-10"
        >
          <Image
            src="/illustration.png"
            alt="Digital Marketing Services"
            width={800}
            height={500}
            className="mx-auto rounded-lg shadow-md"
          />
        </motion.div> */}
      </div>
      <div>
        <CalendlyWidget />
      </div>
    </section>
  );
};

export default OurService;
