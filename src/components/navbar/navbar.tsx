"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // or use Heroicons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#284F6C] sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            <Link href="/" onClick={handleLinkClick}>
              Logo
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-white text-lg">
            <Link href="#" className="hover:text-green-400 transition-colors">
              Why Us
            </Link>
            <Link href="#" className="font-['Roboto'] text-white">
              Testimony
            </Link>
            <Link href="/services">Service</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Blog</Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex text-white space-x-4">
            <Link href="#">Log in</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-white bg-[#284F6C]">
          <Link
            href="#"
            onClick={handleLinkClick}
            className="block hover:text-green-400"
          >
            Why Us
          </Link>
          <Link href="#" onClick={handleLinkClick}>
            Testimony
          </Link>
          <Link href="/services" onClick={handleLinkClick}>
            Service
          </Link>
          <Link href="#" onClick={handleLinkClick}>
            Pricing
          </Link>
          <Link href="#" onClick={handleLinkClick}>
            Blog
          </Link>
          <Link href="#" onClick={handleLinkClick}>
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
