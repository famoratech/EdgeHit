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
      // FIX: Skip ALL private directories (admin, dashboard, api, auth)
      const excludedDirs = ["admin", "dashboard", "api", "auth"];
      if (excludedDirs.includes(entry.name.toLowerCase())) return;

      // Recurse into subdirectories
      paths = paths.concat(getStaticPagePaths(fullPath, relativePath));
    } else if (entry.isFile()) {
      // FIX: CRITICAL - Skip any file named 'route.js' (API routes)
      if (entry.name.startsWith("route.")) return;

      // Only include JS/TS/TSX/JSX files for pages
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
  // FIX: Hardcode your canonical URL here to force consistency.
  // CHOOSE ONE: https://www.edgehit.ca OR https://edgehit.ca
  siteUrl: "https://www.edgehit.ca", // <-- CHANGE THIS TO YOUR PREFERRED CANONICAL URL

  // Generate a robots.txt file automatically
  generateRobotsTxt: true,

  // Max URLs per sitemap file
  sitemapSize: 7000,

  // Default change frequency and priority for static pages
  changefreq: "monthly",
  priority: 0.8,

  // FIX: Expanded exclude list to block API and Auth routes from being scanned/processed at all.
  exclude: [
    "/admin/**",
    "/dashboard/**",
    "/api/**",
    "/auth/**",
    "/verify", // Added based on your sitemap output
  ],

  // FIX: REMOVED the entire `additionalPaths` function.
  // It is causing more problems than it solves by creating relative paths.
  // Let next-sitemap automatically find your pages based on the app/ directory.
  // It will automatically find your pages and use the correct siteUrl.

  // Optional: customize robots.txt policies
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    // FIX: This line is redundant as next-sitemap generates this automatically. You can remove it.
    // additionalSitemaps: [
    //   `https://www.edgehit.ca/sitemap.xml`,
    // ],
  },
};
