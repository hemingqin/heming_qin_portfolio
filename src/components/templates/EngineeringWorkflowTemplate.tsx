import type { EngineeringWorkflowExperience } from "@/types/portfolio";
import styles from "./CaseStudy.module.css";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BulletList } from "@/components/ui/BulletList";
import { TechTags } from "@/components/ui/TechTags";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { WorkflowDiagram } from "@/components/diagrams/WorkflowDiagram";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";

export function EngineeringWorkflowTemplate({ experience }: { experience: EngineeringWorkflowExperience }) {
  let sectionNumber = 0;
  const nextSection = () => String(++sectionNumber).padStart(2, "0");

  return (
    <article className={styles.page}>
      <PageHero
        title={experience.organization}
        subtitle={experience.focusTagline}
        description={experience.summary}
        technologies={experience.technologies}
        meta={[
          { label: "Role", value: experience.role },
          { label: "Dates", value: experience.dates },
          { label: "Location", value: experience.location },
        ]}
      />

      <div className={`mx-auto max-w-content px-4 sm:px-6 ${styles.body}`}>
        <section aria-labelledby="background-heading">
          <SectionHeading id="background-heading" eyebrow={nextSection()} title="Background" />
          <div className="mt-6 max-w-prose space-y-5">
            {experience.background.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-medium text-fg">{section.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="research-problem-heading">
          <SectionHeading id="research-problem-heading" eyebrow={nextSection()} title="Research Problem" />
          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="mono-label text-[11px] uppercase text-fg-subtle">Scientific Research Challenge</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{experience.researchProblem.scientificChallenge}</dd>
            </div>
            <div>
              <dt className="mono-label text-[11px] uppercase text-fg-subtle">Engineering Workflow Challenge</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{experience.researchProblem.engineeringChallenge}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="platform-heading">
          <SectionHeading id="platform-heading" eyebrow={nextSection()} title="Engineering Simulation Workflow Platform" />
          <div className="mt-6 max-w-prose space-y-5">
            <p className="text-sm leading-relaxed text-fg-muted">{experience.platform.description}</p>
            <BulletList items={experience.platform.capabilities} />
            <div className="rounded-lg border border-border bg-bg-subtle p-4">
              <p className="mono-label text-[11px] uppercase text-fg-subtle">Status</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{experience.platform.note}</p>
            </div>
          </div>
        </section>

        <section className={styles.contributions} aria-labelledby="role-heading">
          <SectionHeading id="role-heading" eyebrow={nextSection()} title="My Engineering Contributions" />
          <div className="mt-6 max-w-prose space-y-5">
            <p className="text-sm leading-relaxed text-fg-muted">{experience.myRole.summary}</p>
            <BulletList items={experience.myRole.items} />
          </div>
        </section>

        <section aria-labelledby="architecture-heading">
          <SectionHeading
            id="architecture-heading"
            eyebrow={nextSection()}
            title="Platform Architecture"
            description="Scientific simulation outputs feed directly into the platform's ingestion and retrieval pipeline."
          />
          <div className="mt-6">
            <ArchitectureDiagram
              nodes={experience.architecture.nodes}
              connections={experience.architecture.connections}
              variant="compact"
            />
          </div>
          {experience.infrastructure.length > 0 && (
            <div className="mt-4">
              <p className="mono-label text-[11px] uppercase text-fg-subtle">Infrastructure &amp; deployment</p>
              <TechTags items={experience.infrastructure} className="mt-2" />
            </div>
          )}
        </section>

        <section aria-labelledby="research-workflow-heading">
          <SectionHeading id="research-workflow-heading" eyebrow={nextSection()} title="Simulation and Research Workflow" />
          <div className="mt-6 space-y-6">
            {experience.workflow.overview && (
              <p className="max-w-prose text-sm leading-relaxed text-fg-muted">{experience.workflow.overview}</p>
            )}
            <WorkflowDiagram stages={experience.workflow.stages} />
          </div>
        </section>

        <section aria-labelledby="platform-outcome-heading">
          <SectionHeading id="platform-outcome-heading" eyebrow={nextSection()} title="Platform Outcome" />
          <div className={`mt-6 ${styles.outcome}`}>
            <BulletList items={experience.platformOutcome} />
          </div>
        </section>

        <section aria-labelledby="research-outcome-heading">
          <SectionHeading id="research-outcome-heading" eyebrow={nextSection()} title="Research Outcome" />
          <div className="mt-6 max-w-prose space-y-5">
            <p className="text-sm leading-relaxed text-fg-muted">{experience.researchOutcome.summary}</p>
            <BulletList items={experience.researchOutcome.findings} />
          </div>
        </section>

        <section aria-labelledby="publication-heading">
          <SectionHeading id="publication-heading" eyebrow={nextSection()} title="Published Research" />
          <div className="mt-6">
            <PublicationCard publication={experience.publication} />
          </div>
        </section>
      </div>
    </article>
  );
}
