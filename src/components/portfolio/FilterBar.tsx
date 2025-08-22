import Link from "next/link";

const categories = [
  "All",
  "E-Commerce",
  "Healthcare",
  "Education",
  "Nonprofit",
  "Startup",
];

interface FilterBarProps {
  activeCategory: string;
}

export default function FilterBar({ activeCategory }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/portfolio${
            category === "All" ? "" : `?category=${category}`
          }`}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeCategory === category
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
