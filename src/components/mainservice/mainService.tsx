import Link from "next/link";
import React from "react";

const MainService = () => {
  return (
    <section className="bg-white py-10 text-[#284F6C]">
      {/* Container with 80% width, centered */}
      <div className="w-[80%] mx-auto">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Main Service
        </h1>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left Aside - Reports */}
          <aside className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-semibold mb-10">Reports</h2>
            <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
              <img
                src="/graph.png"
                alt="Marketing Graph"
                className="w-full h-full object-fill"
              />
            </div>
          </aside>

          {/* Right Aside - AI Optimization */}
          <aside className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-semibold mb-10">
              AI Data-Driven Optimization
            </h2>
            <h3 className="text-lg font-bold sm:text-xl">
              Improve your business performance and growth through data-driven
              Machine Learning optimization
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Our Data-Driven Marketing Analytics Application powered by
              Artificial Intelligence significantly improves business
              performance and growth through several key mechanisms.
            </p>
            <Link href="#">
              <p className="text-[#FFA500] hover:text-[#ffb733] font-semibold transition-colors cursor-pointer">
                Explore our strategies <span>&gt;</span>
              </p>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default MainService;
