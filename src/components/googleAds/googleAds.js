import Script from "next/script";

const GoogleAds = () => {
  return (
    <div>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8490262632773468"
        crossorigin="anonymous"
      ></Script>
    </div>
  );
};

export default GoogleAds;
