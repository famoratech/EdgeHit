// src/components/portfolio/ProjectGrid.tsx
"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { Project } from "@/lib/types"; // Import the existing Project type

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="text-center text-gray-500">No projects found.</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-90 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out">
            <ProjectCard project={project} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
