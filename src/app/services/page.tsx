"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import services from "@/app/servicesdata/servicesData";

const NAVBAR_HEIGHT = 120; // height of your fixed navbar in px

const Services = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const anchorId = window.location.hash?.substring(1);
    if (anchorId) {
      const element = document.getElementById(anchorId);
      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          NAVBAR_HEIGHT;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-40 py-10 mt-6">
      <h2 className="text-3xl font-bold text-[#284F6C] mb-10 text-center">
        Our Services
      </h2>

      <div className="w-full space-y-20">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              id={service.anchorId}
              style={{ scrollMarginTop: `${NAVBAR_HEIGHT + 20}px` }}
              className={`flex flex-col md:flex-row items-stretch bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-0 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                {React.cloneElement(service.img, {
                  className: "w-full h-auto object-contain",
                })}
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl font-semibold text-[#284F6C] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-3">{service.description}</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 text-left">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Spacer to ensure last card scrolls fully into view */}
        <div className="h-[300px] md:h-[200px]"></div>
      </div>
    </div>
  );
};

export default Services;
