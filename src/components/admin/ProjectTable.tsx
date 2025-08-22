// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import type { Project } from "@/lib/types";
// import { Button } from "../ui/button";
// import Link from "next/link";

// interface ProjectTableProps {
//   initialProjects?: Project[]; // Optional prop for server-side data
// }

// export default function ProjectTable({
//   initialProjects = [],
// }: ProjectTableProps) {
//   const [projects, setProjects] = useState<Project[]>(initialProjects);
//   const [loading, setLoading] = useState(!initialProjects.length);

//   useEffect(() => {
//     // Only fetch if no initial data provided
//     if (initialProjects.length === 0) {
//       const fetchProjects = async () => {
//         const { data, error } = await supabase
//           .from("projects")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (error) {
//           console.error("Error:", error);
//         } else {
//           setProjects(data || []);
//         }
//         setLoading(false);
//       };

//       fetchProjects();
//     }
//   }, [initialProjects]);

//   if (loading) return <div>Loading projects...</div>;

//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <table className="w-full">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 text-left">Title</th>
//             <th className="px-6 py-3 text-left">Status</th>
//             <th className="px-6 py-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project) => (
//             <tr key={project.id} className="border-t">
//               <td className="px-6 py-4">{project.title}</td>
//               <td className="px-6 py-4">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     project.is_published
//                       ? "bg-green-100 text-green-800"
//                       : "bg-yellow-100 text-yellow-800"
//                   }`}
//                 >
//                   {project.is_published ? "Published" : "Draft"}
//                 </span>
//               </td>
//               <td className="px-6 py-4 space-x-2">
//                 <Button asChild variant="outline" size="sm">
//                   <Link href={`/admin/portfolio/edit/${project.id}`}>Edit</Link>
//                 </Button>
//                 <Button variant="destructive" size="sm">
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

//

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface ProjectTableProps {
  initialProjects?: Project[];
}

export default function ProjectTable({
  initialProjects = [],
}: ProjectTableProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(!initialProjects.length);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    // Only fetch if we have no initial projects and projects array is empty
    if (initialProjects.length === 0 && projects.length === 0) {
      fetchProjects();
    }
  }, [initialProjects, projects.length]); // Added projects.length to dependencies

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(projectId);
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-4">Loading projects...</div>;

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="px-6 py-4">{project.title}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    project.is_published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.is_published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/portfolio/edit/${project.id}`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  disabled={deletingId === project.id}
                >
                  {deletingId === project.id ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
