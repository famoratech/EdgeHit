import React from "react";
import Script from "next/script";
// <!-- Google tag (gtag.js) -->
const GoogleAnalytics = () => {
  return (
    <div>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DX0MLH0N1N"
      ></Script>
      <Script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-DX0MLH0N1N');
      </Script>
    </div>
  );
};

export default GoogleAnalytics;
