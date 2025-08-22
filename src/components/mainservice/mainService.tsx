"use client";

import Link from "next/link";
import React from "react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const MainService = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  return (
    <section className="bg-white py-10 text-[#284F6C]">
      {/* Container with 80% width, centered */}
      <div className="w-[80%] mx-auto">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-10">
          Main Service
        </h1>
        {/* First Slide */}
        <div className="embla relative w-full overflow-hidden">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex">
              {/* First Slide */}
              <div className="embla__slide flex-[0_0_100%] min-w-0">
                <aside className="w-full flex flex-col items-center text-center space-y-4 px-4">
                  <h2 className="text-2xl font-semibold mb-10"></h2>
                  <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg">
                    <div>
                      <h1 className="text-2xl font-bold mb-4">
                        📊 Predict ROI Conversion rate with AI
                      </h1>
                      <p className="mb-6">
                        Streamline marketing insights with AI-driven conversion
                        predictions. Log in for a demo and start analyzing your
                        campaigns.
                      </p>
                      <a
                        href="/auth"
                        className="bg-[#FFA500] hover:bg-[#ffb733] font-['Montserrat'] font-bold text-white px-4 py-2 rounded"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </aside>
              </div>

              {/* Second Slide */}
              <div className="embla__slide flex-[0_0_100%] min-w-0">
                <aside className="w-full flex flex-col items-center text-center space-y-4 px-4">
                  <h2 className="text-2xl font-semibold mb-10">
                    AI Data-Driven Optimization
                  </h2>
                  <h3 className="text-lg font-bold sm:text-xl">
                    Improve your business performance and growth through
                    data-driven Machine Learning optimization
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Our Data-Driven Marketing Analytics Application powered by
                    Artificial Intelligence significantly improves business
                    performance and growth through several key mechanisms.
                  </p>
                  <Link href="/learn-more">
                    <p className="text-[#FFA500] hover:text-[#ffb733] font-semibold transition-colors cursor-pointer">
                      Learn More <span>&gt;</span>
                    </p>
                  </Link>
                </aside>
              </div>

              {/* Third Slide */}
              <div className="embla__slide flex-[0_0_100%] min-w-0">
                <aside className="w-full flex flex-col items-center text-center space-y-4 px-4">
                  <h2 className="text-2xl font-semibold mb-10">
                    Unify Dashboard
                  </h2>
                  <h3 className="text-lg font-bold sm:text-xl">
                    View all your campaign Analytics in a single dashboard
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    A unified marketing dashboard consolidates all campaign data
                    into a single, centralized platform, providing comprehensive
                    performance insights and streamlined management across all
                    marketing channels and initiatives
                  </p>
                  <Link href="/auth">
                    <p className="text-[#FFA500] hover:text-[#ffb733] font-semibold transition-colors cursor-pointer">
                      sign-up for a demo <span>&gt;</span>
                    </p>
                  </Link>
                </aside>
              </div>
              {/* Fourth Slide */}
              <div className="embla__slide flex-[0_0_100%] min-w-0">
                <aside className="w-full flex flex-col items-center text-center space-y-4 px-4">
                  <h2 className="text-2xl font-semibold mb-10">
                    Our Strategic Approach{" "}
                  </h2>
                  <h3 className="text-lg font-bold sm:text-xl">
                    Harnessing the power of data to deliver marketing strategies
                    that are as unique as your business
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    We deliver insight-driven marketing strategies meticulously
                    tailored to your business’s distinct needs, steer clear of
                    generic approaches in favor of customized solutions that
                    produce clear, quantifiable results for your unique
                    challenges and business growth
                  </p>
                  <Link href="/our-strategy">
                    <p className="text-[#FFA500] hover:text-[#ffb733] font-semibold transition-colors cursor-pointer">
                      Explore our strategies <span>&gt;</span>
                    </p>
                  </Link>
                </aside>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 text-white p-2 rounded-full z-10"
            onClick={scrollPrev}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z"
              />
            </svg>
          </button>
          <button
            className="embla__next absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 text-white p-2 rounded-full z-10"
            onClick={scrollNext}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainService;
