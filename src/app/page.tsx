import GoogleCalendarEmbed from "@/components/calendar/googleCalendar";
import Hero from "@/components/heroBanners/hero";
import MainService from "@/components/mainservice/mainService";
import OurService from "@/components/ourservice/ourService";

export default function Home() {
  return (
    <div>
      <Hero />
      <MainService />
      <OurService />
      <div id="appointment">
        <GoogleCalendarEmbed />
      </div>
    </div>
  );
}
