"use client";

import { useState } from "react";
import Form from "../forms/form";
import Link from "next/link";
import SocialIcons from "../socialIcons/socialIcons";
import { NewsletterForm } from "../newsletter/NewsletterForm";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#284F6C] pt-20 w-screen bottom-0">
      {/* Main container with centered form */}
      <div className="relative flex flex-col items-center">
        {/* Desktop: Social Icons on left */}
        <div className="hidden md:block absolute left-10 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold font-['Montserrat'] mb-4">
              Follow Us
            </h2>
            <SocialIcons />
          </div>
        </div>

        {/* Centered Form (maintains original size) */}
        <div id="contact-form" className="w-full max-w-[600px] px-4">
          <Form />
        </div>

        {/* Mobile: Social Icons below (horizontal) */}
        <div className="md:hidden mt-8 w-full flex flex-col items-center">
          <h2 className="text-white text-lg font-bold font-['Montserrat'] mb-4">
            Follow Us
          </h2>
          <div className="flex justify-center">
            <SocialIcons />
          </div>
        </div>
      </div>

      {/* Bottom links section */}
      <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:justify-center mt-7 bg-white md:gap-0">
        <div className="w-50 font-bold font-['Montserrat'] text-center text-[#284F6C] hover:bg-[#FFA500] hover:text-white cursor-pointer border-r-0 border-[#284F6C] md:border-r-4">
          {/* <Link href="">
            Join <span className="text-2xl block">Edge HIT</span>
          </Link> */}

          <>
            {/* This is the button that appears on your homepage */}
            <div onClick={() => setIsOpen(true)}>
              Join <span className="text-2xl block">Newsletter</span>
            </div>

            {/* The popup form that appears when button is clicked */}
            <NewsletterForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </>
        </div>
        <div className="w-50 font-bold font-['Montserrat'] text-center text-[#284F6C] hover:bg-[#FFA500] hover:text-white border-r-0 border-[#284F6C] md:border-r-4">
          <Link href="tel:+16476710065">
            Call Us <span className="text-2xl block">+1 647-671-0065</span>
          </Link>
        </div>
        <Link href="/services">
          <div className="w-50 font-bold font-['Montserrat'] text-center text-[#284F6C] hover:bg-[#FFA500] hover:text-white border-r-0 border-[#284F6C] md:border-r-0">
            View our <span className="text-2xl block">services</span>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="h-10 flex flex-row justify-center mt-4">
        <p className="text-white text-sm font-['Lato']">
          © {new Date().getFullYear()} Edge HIT. All rights reserved.
        </p>
        <span className="text-white text-sm font-['Lato'] mx-2">|</span>
        <Link href="/privacy-policy">
          <p className="text-white text-sm font-['Lato']">Privacy Policy</p>
        </Link>
        <span className="text-white text-sm font-['Lato'] mx-2">|</span>
        <Link href="/terms-of-service">
          <p className="text-white text-sm font-['Lato']">Terms of Service</p>
        </Link>
      </footer>
    </section>
  );
};

export default Footer;
