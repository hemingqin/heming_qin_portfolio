import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/types/portfolio";
import { TechTags } from "./TechTags";
import { cn } from "@/lib/cn";

const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-positive/10 text-positive",
  "in-progress": "bg-accent-soft text-accent",
  archived: "bg-bg-inset text-fg-subtle",
  concept: "bg-bg-inset text-fg-subtle",
};

const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  "in-progress": "In progress",
  archived: "Archived",
  concept: "Concept",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col justify-between rounded-lg border border-border bg-bg-subtle p-6 sm:p-8 transition-colors hover:border-border-strong hover:bg-bg-inset"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "mono-label rounded px-1.5 py-0.5 text-[13px] uppercase",
              statusStyles[project.status]
            )}
          >
            {statusLabel[project.status]}
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>
        <h2 className="mt-4 text-[26px] font-semibold tracking-tight text-fg">{project.title}</h2>
        <p className="mt-4 text-[17px] leading-[1.65] text-fg-muted">{project.description}</p>
      </div>
      <TechTags items={project.technologies} className="mt-6" />
    </Link>
  );
}
