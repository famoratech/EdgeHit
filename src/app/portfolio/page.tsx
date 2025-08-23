import { supabase } from "@/lib/supabase";
import FilterBar from "@/components/portfolio/FilterBar";
import ProjectGrid from "@/components/portfolio/ProjectGrid"; // New client component

export const revalidate = 604800; // 7 days in seconds

export const metadata = {
  title: "Our Portfolio | EdgeHit Digital Marketing",
  description:
    "Discover EdgeHit's portfolio of successful projects. See how our marketing strategies have driven growth across various industries.",
  keywords: [
    "digital marketing portfolio",
    "EdgeHit projects",
    "marketing case studies",
    "successful campaigns",
    "creative agency work",
  ],
  authors: [{ name: "EdgeHit Digital Marketing" }],
  creator: "EdgeHit Digital Marketing",
  openGraph: {
    title: "Our Portfolio | EdgeHit Digital Marketing",
    description:
      "Explore EdgeHit's portfolio of successful marketing campaigns and projects.",
    url: "https://www.edgehit.ca/portfolio",
    siteName: "EdgeHit Digital Marketing",
    images: [
      {
        url: "https://www.edgehit.ca/images/ogimage.jpeg", // replace with your branded OG image
        width: 1200,
        height: 630,
        alt: "EdgeHit portfolio showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio | EdgeHit Digital Marketing",
    description:
      "Explore EdgeHit's portfolio of successful marketing campaigns and projects.",
    images: ["https://www.edgehit.ca/images/ogimage.jpeg"],
    creator: "@EdgeHitMarketing",
  },
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const selectedCategory = category || "All";

  let query = supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (selectedCategory !== "All") {
    query = query.eq("category", selectedCategory);
  }

  const { data: projects } = await query;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Our Portfolio</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Explore our collection of successful projects.
          </p>
        </div>

        {/* <pre>
          <code>{JSON.stringify(projects, null, 2)}</code>
        </pre> */}

        <div className="flex justify-center mb-8">
          <FilterBar activeCategory={selectedCategory} />
        </div>

        <ProjectGrid projects={projects ?? []} />
      </div>
    </section>
  );
}
