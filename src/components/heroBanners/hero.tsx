import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[950px] text-white overflow-hidden z-0">
      <Image
        src="/images/hero.jpg"
        width={1920}
        height={950}
        alt="Marketing Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 backdrop-brightness-50">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold font-['Roboto'] text-white animate-fade-in-left">
          Empowering Your Business with Data-Driven Marketing Solutions
        </h1>

        <p className="mt-5 text-sm sm:text-base md:text-2xl  font-['Open_Sans'] text-white animate-fade-in-left delay-200">
          Unlock the potential of your data to drive growth and success.
        </p>
        <a href="#contact-form">
          <button className="mt-6 px-6 py-2 text-white font-['Montserrat'] font-bold bg-[#FFA500] hover:bg-[#ffb733] cursor-pointer transition-all duration-300 animate-fade-in-left delay-400">
            Get Started
          </button>
        </a>
        <p className="mt-5 text-xs sm:text-sm md:text-base font-['Lato'] text-white animate-fade-in-left delay-600">
          Join hundreds of businesses transforming their marketing strategies.
        </p>
      </div>
    </div>
  );
};

export default Hero;
