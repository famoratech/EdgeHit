// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["source.unsplash.com"], // still allow Unsplash image loading
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ffpqnwdgctarhjikksnn.supabase.co", // ← your Supabase project ref
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  webpack: (config) => {
    // Enable WASM support
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    };

    // Critical WASM file handling
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
      generator: {
        filename: "static/wasm/[name][ext]",
      },
    });

    return config;
  },
};
