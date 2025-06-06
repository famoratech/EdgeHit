import Hero from "@/components/heroBanners/hero";
import MainService from "@/components/mainservice/mainService";
import OurService from "@/components/ourservice/ourService";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <MainService />
      <OurService />

      <div>Home Page</div>
    </div>
  );
}
