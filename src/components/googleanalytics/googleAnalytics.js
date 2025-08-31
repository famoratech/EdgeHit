import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <div>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DX0MLH0N1N"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DX0MLH0N1N');
          `,
        }}
      />
    </div>
  );
};

export default GoogleAnalytics;
