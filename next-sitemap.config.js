// next-sitemap.config.js
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// List of routes to BLOCK from the sitemap
const excludedRoutes = [
  "/admin",
  "/admin/**",
  "/dashboard",
  "/dashboard/**",
  "/auth",
  "/auth/**",
  "/api",
  "/api/**",
  "/verify",
  "/predict",
  "/icon.png", // Also excluding the image file
];

// Function to check if a URL should be excluded
const isExcluded = (url) => {
  return excludedRoutes.some((route) => {
    if (route.endsWith("/**")) {
      // Check if the URL starts with the base path (for wildcard patterns)
      const baseRoute = route.replace("/**", "");
      return url.startsWith(baseRoute);
    }
    // Exact match check
    return url === route;
  });
};

module.exports = {
  siteUrl: "https://www.edgehit.ca",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "monthly",
  priority: 0.8,

  // Use the transform function to filter out unwanted URLs
  transform: async (config, path) => {
    // Create the full URL
    const fullUrl = `${config.siteUrl}${path}`;

    // Check if this URL should be excluded
    if (isExcluded(path)) {
      console.log(`Excluding URL from sitemap: ${fullUrl}`);
      return null; // Returning null excludes this URL
    }

    // Return the default configuration for valid URLs
    return {
      loc: fullUrl,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // NEW: Manually ensure the /portfolio page is included
  additionalPaths: async (config) => {
    // Manually add the portfolio page
    const portfolioPath = await config.transform(config, "/portfolio");

    // Return an array of manually added paths
    // You can add other important pages here if needed in the future
    return [portfolioPath].filter(Boolean); // filter(Boolean) removes any null entries
  },

  // Optional: robots.txt configuration
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
