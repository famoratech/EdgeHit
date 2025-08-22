"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useSupabaseUser();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      window.location.href = "/"; // Or use next/router to push
    }
  };

  return (
    <nav className="bg-[#284F6C] sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            <Link href="/" onClick={handleLinkClick}>
              <Image
                src="/images/logoo.png"
                alt="Logos"
                width={110}
                height={50}
              />{" "}
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hover:text-[#FFB733] cursor-pointer"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-white text-lg">
            <Link
              href="about-us"
              className="hover:text-[#FFB733] transition-colors"
            >
              Why us
            </Link>
            <Link href="/services" className="hover:text-[#FFB733]">
              Service
            </Link>
            <Link href="/portfolio" className="hover:text-[#FFB733]">
              Portfolio
            </Link>

            {/* <Link href="#">Pricing</Link> */}
            <Link href="/blog" className="hover:text-[#FFB733]">
              Blog
            </Link>
          </div>

          {/* Desktop Right Side Auth Link */}
          <div className="hidden md:flex text-white space-x-4">
            {!loading && user ? (
              <button onClick={handleLogout} className="hover:text-red-400">
                Log Out
              </button>
            ) : (
              <Link href="/auth" className="hover:text-[#FFB733]">
                Log-in / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 mt-20 z-50 flex h-1/2 flex-col bg-[#284F6C] text-white p-6">
          {/* Top bar with Log-in / Sign Up */}
          <div className="flex justify-end">
            {!loading && !user ? (
              <Link
                href="/auth"
                onClick={handleLinkClick}
                className="hover:text-[#FFB733] cursor-pointer"
              >
                Log-in / Sign Up
              </Link>
            ) : null}
          </div>

          {/* Left-aligned navigation links */}
          <div className="mt-6 flex flex-col items-start space-y-4">
            <Link
              href="/about-us"
              onClick={handleLinkClick}
              className="hover:text-[#FFB733] cursor-pointer"
            >
              Why Us
            </Link>
            <Link
              href="/services"
              onClick={handleLinkClick}
              className="hover:text-[#FFB733] cursor-pointer"
            >
              Service
            </Link>
            <Link
              href="/portfolio"
              onClick={handleLinkClick}
              className="hover:text-[#FFB733] cursor-pointer"
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="hover:text-[#FFB733] cursor-pointer"
            >
              Blog
            </Link>

            {/* Authenticated User: Log Out */}
            {!loading && user ? (
              <button
                onClick={() => {
                  handleLogout();
                  handleLinkClick();
                }}
                className="hover:text-[#FFB733] cursor-pointer"
              >
                Log Out
              </button>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
