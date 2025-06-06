import React from "react";
import Form from "../forms/form";
import Link from "next/link";
import SocialIcons from "../socialIcons/socialIcons";

const Footer = () => {
  return (
    <section className="bg-[#284F6C] display:block pt-20 w-screen bottom-0">
      <Form />

      <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:justify-center mt-7 bg-white md:gap-0">
        <div className="w-50 text-center hover:bg-sky-700 border-r-0 border-zinc-950 md:border-r-4">
          <Link href="">
            Join <span className="text-2xl block">Edge HIT</span>
          </Link>
        </div>
        <div className="w-50 text-center hover:bg-sky-700 border-r-0 border-zinc-950 md:border-r-4">
          <Link href="">
            Call Us <span className="text-2xl block">123-345-1234</span>
          </Link>
        </div>
        <Link href="">
          <div className="w-50 text-center hover:bg-sky-700 border-r-0 border-zinc-950 md:border-r-0">
            View our <span className="text-2xl block">services</span>
          </div>
        </Link>
      </div>

      <footer className="h-10 flex flex-row justify-center mt-4">
        <SocialIcons />
      </footer>
    </section>
  );
};

export default Footer;
