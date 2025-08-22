import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardContent = (
    <>
      {/* Image */}
      <div className="relative h-60 w-full">
        <Image
          src={project.image_url || "/placeholder.png"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-900">
          {project.title}
        </h3>

        {/* Category */}
        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
          {project.category}
        </span>

        {/* Description */}
        {project.description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Visit Website */}
        {project.domain_url && (
          <div className="mt-4">
            <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Visit Website →
            </span>
          </div>
        )}
      </div>
    </>
  );

  return project.domain_url ? (
    <Link
      href={project.domain_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {cardContent}
    </Link>
  ) : (
    <div className="group border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {cardContent}
    </div>
  );
}
