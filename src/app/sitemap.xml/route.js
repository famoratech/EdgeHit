// app/sitemap.xml/route.js
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  // Initialize Supabase (use environment variables)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Fetch published blog posts
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("is_draft", false)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }

  // Get your static pages
  const staticPages = [
    "",
    "/services",
    "/blog",
    "/our-strategy",
    "/learn-more",
    "/about-us",
    "/portfolio",
  ];

  // Generate XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>https://www.edgehit.ca${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>
  `
    )
    .join("")}
  
  <!-- Dynamic blog posts -->
  ${posts
    .map(
      (post) => `
    <url>
      <loc>https://www.edgehit.ca/blog/${post.slug}</loc>
      <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

  // Return the sitemap as XML response
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate", // Cache for 24 hours
    },
  });
}
