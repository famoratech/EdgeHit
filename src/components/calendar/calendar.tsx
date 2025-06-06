"use client"; // Mark as Client Component

import { useEffect } from "react";

const CalendlyWidget = () => {
  useEffect(() => {
    // Load Calendly widget script dynamically
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/oagbeye/book-consultation?text_color=284f6c&primary_color=ffa500"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
};

export default CalendlyWidget;
