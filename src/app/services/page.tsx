// src/app/services/page.tsx
import React, { Suspense } from "react";
import ServicesContent from "./ServicesContent";

const ServicesPage = () => {
  return (
    <Suspense
      fallback={<div className="text-center py-10">Loading Services...</div>}
    >
      <ServicesContent />
    </Suspense>
  );
};

export default ServicesPage;
