import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  webpack: (config) => {
    config.module.rules.push({
      test: /\.onnx$/,
      type: "asset/resource",
      generator: {
        filename: "static/[hash][ext][query]",
      },
      use: {
        loader: "file-loader",
        options: {
          publicPath: false, // Disable public URL generation
          outputPath: "static/chunks/", // Internal build folder
          name: "[name].[hash].[ext]",
        },
      },
    });
    return config;
  },
};

export default nextConfig;
