import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectDetailTemplate } from "@/components/templates/ProjectDetailTemplate";
import { PrevNextNav } from "@/components/ui/PrevNextNav";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <ProjectDetailTemplate project={project} />
      <div className="mx-auto max-w-content px-4 pb-14 sm:px-6">
        <PrevNextNav
          indexHref="/projects"
          indexLabel="Back to projects"
          prev={prev ? { label: prev.title, href: `/projects/${prev.slug}` } : undefined}
          next={next ? { label: next.title, href: `/projects/${next.slug}` } : undefined}
        />
      </div>
    </>
  );
}
