import type { Project, ProjectStatus } from "@/types/portfolio";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLinkCard } from "@/components/ui/ExternalLinkCard";
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { EmptyPlaceholder } from "@/components/ui/EmptyPlaceholder";
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

export function ProjectDetailTemplate({ project }: { project: Project }) {
  const actions = (
    <>
      {project.githubLink && <ExternalLinkCard link={project.githubLink} />}
      {project.liveDemoLink && <ExternalLinkCard link={project.liveDemoLink} />}
    </>
  );

  return (
    <article>
      <div className="border-b border-border">
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-center gap-2">
            <span className="mono-label text-xs uppercase text-fg-subtle">Project</span>
            <span className={cn("mono-label rounded px-1.5 py-0.5 text-[11px] uppercase", statusStyles[project.status])}>
              {statusLabel[project.status]}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-fg sm:text-4xl">{project.title}</h1>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">{project.description}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <dt className="mono-label text-[11px] uppercase text-fg-subtle">Role</dt>
              <dd className="text-sm text-fg">{project.role}</dd>
            </div>
            <div>
              <dt className="mono-label text-[11px] uppercase text-fg-subtle">Dates</dt>
              <dd className="text-sm text-fg">{project.dates}</dd>
            </div>
          </dl>

          {project.technologies.length > 0 && (
            <ul className="mono-label mt-6 flex flex-wrap gap-1.5 text-[11px] text-fg-muted">
              {project.technologies.map((t) => (
                <li key={t} className="rounded border border-border bg-bg-subtle px-1.5 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
        </div>
      </div>

      <div className="mx-auto max-w-content space-y-16 px-4 py-14 sm:px-6">
        <section aria-labelledby="overview-heading">
          <SectionHeading id="overview-heading" eyebrow="01" title={project.overview.title} description={project.overview.body} />
        </section>

        <section aria-labelledby="architecture-heading">
          <SectionHeading id="architecture-heading" eyebrow="02" title="Architecture" />
          <div className="mt-6">
            <ArchitectureDiagram nodes={project.architecture.nodes} connections={project.architecture.connections} />
          </div>
          <div className="mt-4">
            {project.architecture.explanation ? (
              <p className="text-sm leading-relaxed text-fg-muted">{project.architecture.explanation}</p>
            ) : (
              <EmptyPlaceholder text="Architecture explanation will be added." />
            )}
          </div>
        </section>

        <section aria-labelledby="challenges-heading" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <SectionHeading id="challenges-heading" eyebrow="03" title={project.challenges.title} />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{project.challenges.body}</p>
          </div>
          <div>
            <SectionHeading eyebrow="04" title={project.implementation.title} />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{project.implementation.body}</p>
          </div>
        </section>

        <section aria-labelledby="outcomes-heading">
          <SectionHeading id="outcomes-heading" eyebrow="05" title={project.outcomes.title} />
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">{project.outcomes.body}</p>
        </section>

        <section aria-labelledby="gallery-heading">
          <SectionHeading id="gallery-heading" eyebrow="06" title="Screenshots" />
          <div className="mt-6">
            <ScreenshotGallery items={project.gallery} />
          </div>
        </section>
      </div>
    </article>
  );
}
