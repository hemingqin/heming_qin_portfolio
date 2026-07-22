import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Personal and engineering projects outside of formal employment.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Projects"
        title="Selected projects"
        description="Personal and engineering projects not directly represented as employment. This list will grow over time."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
