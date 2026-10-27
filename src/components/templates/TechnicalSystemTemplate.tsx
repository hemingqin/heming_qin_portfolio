import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { TechnicalSystemExperience } from "@/types/portfolio";
import styles from "./CaseStudy.module.css";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { ExternalLinkCard } from "@/components/ui/ExternalLinkCard";
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";
import { TechTags } from "@/components/ui/TechTags";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";

export function TechnicalSystemTemplate({ experience }: { experience: TechnicalSystemExperience }) {
  const actions = (
    <>
      {experience.githubLink && <ExternalLinkCard link={experience.githubLink} />}
      {experience.liveDemoLink && <ExternalLinkCard link={experience.liveDemoLink} />}
    </>
  );

  return (
    <article className={styles.page}>
      <PageHero
        title={experience.organization}
        subtitle={experience.shortDescription}
        description={experience.summary}
        technologies={experience.technologies}
        meta={[
          { label: "Role", value: experience.role },
          { label: "Dates", value: experience.dates },
          { label: "Location", value: experience.location },
        ]}
        actions={actions}
      />

      <div className={`mx-auto max-w-content px-4 sm:px-6 ${styles.body}`}>
        <section aria-labelledby="overview-heading">
          <SectionHeading id="overview-heading" eyebrow="01" title="Overview" />
          <div className="mt-6 max-w-prose space-y-5">
            {experience.overview.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-medium text-fg">{section.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="challenges-heading">
          <SectionHeading
            id="challenges-heading"
            eyebrow="02"
            title="Challenges"
            description="What volunteers, coordinators, and staff experienced with the previous system."
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {experience.challenges.map((challenge) => (
              <HighlightCard key={challenge.title} item={challenge} />
            ))}
          </div>
        </section>

        <section className={styles.contributions} aria-labelledby="solutions-heading">
          <SectionHeading
            id="solutions-heading"
            eyebrow="03"
            title="My Engineering Contributions"
            description="Each solution below maps to one of the challenges above — technology appears only where it supports the solution."
          />
          <div className="mt-8 space-y-12">
            {experience.solutions.map((solution, index) => (
              <div key={solution.title} className={index > 0 ? "space-y-4 border-t border-border pt-10" : "space-y-4"}>
                <div>
                  <p className="mono-label text-[11px] uppercase text-fg-subtle">Solves: {solution.problemSolved}</p>
                  <h3 className="mt-1 text-lg font-medium tracking-tight text-fg">{solution.title}</h3>
                </div>

                {solution.screenshot ? (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
                    <p className="text-sm leading-relaxed text-fg-muted">{solution.description}</p>
                    <figure className="overflow-hidden rounded-lg border border-border bg-bg-subtle">
                      <div className="flex aspect-video items-center justify-center bg-bg-inset">
                        {solution.screenshot.src ? (
                          <Image
                            src={solution.screenshot.src}
                            alt={solution.screenshot.alt}
                            width={640}
                            height={360}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-fg-subtle">
                            <ImageIcon className="h-5 w-5" aria-hidden />
                            <span className="text-xs">Image will be added</span>
                          </div>
                        )}
                      </div>
                    </figure>
                  </div>
                ) : (
                  <p className="max-w-prose text-sm leading-relaxed text-fg-muted">{solution.description}</p>
                )}

                {solution.architecture && (
                  <div className="pt-2">
                    <ArchitectureDiagram
                      nodes={solution.architecture.nodes}
                      connections={solution.architecture.connections}
                      variant={
                        solution.title === "Real-time Notification System" || solution.title === "Performance Optimization"
                          ? "compact"
                          : "standard"
                      }
                    />
                  </div>
                )}

                {solution.explanationPoints && solution.explanationPoints.length > 0 && (
                  <ul className="max-w-prose list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-fg-muted">
                    {solution.explanationPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                {solution.whyThisDesign && (
                  <div className="max-w-prose rounded-lg border border-border bg-bg-subtle p-4">
                    <p className="mono-label text-[11px] uppercase text-fg-subtle">Why this design?</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{solution.whyThisDesign}</p>
                  </div>
                )}

                <TechTags items={solution.technologies} />
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="results-heading">
          <SectionHeading id="results-heading" eyebrow="04" title="Outcome & Impact" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {experience.metrics.map((m) => (
              <MetricCard key={m.label} metric={m} />
            ))}
          </div>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-fg-muted">{experience.resultsSummary}</p>
        </section>

        <section aria-labelledby="gallery-heading">
          <SectionHeading id="gallery-heading" eyebrow="05" title="Gallery" />
          <div className="mt-6">
            <ScreenshotGallery items={experience.gallery} />
          </div>
        </section>
      </div>
    </article>
  );
}
