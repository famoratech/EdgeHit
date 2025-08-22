// next-sitemap.config.js
// Pure JavaScript version compatible with Next.js, no TypeScript

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// ------------------------------
// Initialize Supabase client
// ------------------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // Supabase project URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Supabase public anon key
);

// ------------------------------
// Function to recursively get static pages
// ------------------------------
function getStaticPagePaths(dir, baseUrl = "") {
  let paths = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseUrl, entry.name);

    if (entry.isDirectory()) {
      // Skip admin/private directories
      if (["admin", "dashboard"].includes(entry.name.toLowerCase())) return;

      // Recurse into subdirectories
      paths = paths.concat(getStaticPagePaths(fullPath, relativePath));
    } else if (entry.isFile()) {
      // Only include JS/TS/TSX/JSX files
      if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        let route = relativePath
          .replace(/\\/g, "/") // Normalize Windows backslashes
          .replace(/\/page\.(tsx|ts|jsx|js)$/, "") // Remove /page suffix
          .replace(/\.(tsx|ts|jsx|js)$/, ""); // Remove file extension

        if (route === "/index") route = ""; // Root page
        paths.push(route);
      }
    }
  });

  return paths;
}

// ------------------------------
// Function to fetch dynamic pages from Supabase
// ------------------------------
async function fetchDynamicPaths() {
  const paths = [];

  // Blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_draft", false); // Only published posts
  if (blogPosts) {
    blogPosts.forEach((post) => {
      paths.push(`/blog/${post.slug}`);
    });
  }

  // Portfolio items
  const { data: portfolios } = await supabase.from("portfolio").select("id");
  if (portfolios) {
    portfolios.forEach((item) => {
      paths.push(`/portfolio/${item.id}`);
    });
  }

  return paths;
}

// ------------------------------
// Path to your Next.js app folder
// ------------------------------
const appDir = path.join(process.cwd(), "src", "app");

// ------------------------------
// Export Next-Sitemap configuration
// ------------------------------
module.exports = {
  // Base URL for your site
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://edgehit.ca",

  // Generate a robots.txt file automatically
  generateRobotsTxt: true,

  // Max URLs per sitemap file
  sitemapSize: 7000,

  // Default change frequency and priority for static pages
  changefreq: "monthly",
  priority: 0.8,

  // Exclude private/admin routes from sitemap
  exclude: ["/admin/**", "/dashboard/**"],

  // Add additional paths dynamically
  additionalPaths: async () => {
    const staticPages = getStaticPagePaths(appDir); // Static pages
    const dynamicPages = await fetchDynamicPaths(); // Blog/portfolio

    const allPaths = [...staticPages, ...dynamicPages];

    // Format for next-sitemap
    return allPaths.map((p) => ({
      loc: p,
      priority: 0.85,
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    }));
  },

  // Optional: customize robots.txt policies
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://edgehit.ca"
      }/sitemap-0.xml`,
    ],
  },
};
