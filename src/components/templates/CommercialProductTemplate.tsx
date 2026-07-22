import type { CommercialProductExperience, ProductFeature } from "@/types/portfolio";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProprietaryNotice } from "@/components/ui/ProprietaryNotice";
import { ExternalLinkCard } from "@/components/ui/ExternalLinkCard";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { ShowcaseCard } from "@/components/ui/ShowcaseCard";
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";
import { ProductIntroCard } from "@/components/ui/ProductIntroCard";
import { WorkflowDiagram } from "@/components/diagrams/WorkflowDiagram";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";

const showcaseGrid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

function featureRows(feature: ProductFeature): { label: string; value: string }[] {
  return [
    feature.background && { label: "Background", value: feature.background },
    feature.requirement && { label: feature.requirementLabel ?? "Requirement", value: feature.requirement },
    feature.contribution && { label: "My contribution", value: feature.contribution },
    feature.technicalApproach && {
      label: feature.technicalApproachLabel ?? "Technical approach",
      value: feature.technicalApproach,
    },
    feature.outcome && { label: "Outcome", value: feature.outcome },
  ].filter((row): row is { label: string; value: string } => Boolean(row));
}

export function CommercialProductTemplate({ experience }: { experience: CommercialProductExperience }) {
  let sectionNumber = 0;
  const nextSection = () => String(++sectionNumber).padStart(2, "0");

  return (
    <article>
      <PageHero
        title={experience.organization}
        subtitle={experience.platformTagline}
        description={experience.roleSummary}
        technologies={experience.technologies}
        meta={[
          { label: "Role", value: experience.role },
          { label: "Dates", value: experience.dates },
        ]}
        actions={<ProprietaryNotice text={experience.proprietaryNotice} />}
      />

      <div className="mx-auto max-w-content space-y-16 px-4 py-14 sm:px-6">
        <section aria-labelledby="background-heading">
          <SectionHeading id="background-heading" eyebrow={nextSection()} title="Background" />
          <div className="mt-6 space-y-8">
            {experience.productIntro && <ProductIntroCard intro={experience.productIntro} />}
            <div className="max-w-prose space-y-5">
              {experience.background.map((section) => (
                <div key={section.id}>
                  <h3 className="text-sm font-medium text-fg">{section.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {experience.features.map((feature, index) => (
          <section key={feature.slug} aria-labelledby={`feature-${feature.slug}-heading`}>
            <SectionHeading id={`feature-${feature.slug}-heading`} eyebrow={nextSection()} title={feature.name} />
            <div className="mt-6 space-y-6">
              {feature.productIntro && <ProductIntroCard intro={feature.productIntro} />}

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featureRows(feature).map((row) => (
                  <div key={row.label}>
                    <dt className="mono-label text-[11px] uppercase text-fg-subtle">{row.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-fg-muted">{row.value}</dd>
                  </div>
                ))}
              </dl>

              {feature.architecture && (
                <ArchitectureDiagram
                  nodes={feature.architecture.nodes}
                  connections={feature.architecture.connections}
                  variant="compact"
                />
              )}

              {feature.workflow && feature.workflow.length > 0 && (
                <WorkflowDiagram stages={feature.workflow} />
              )}

              {feature.screenshots && feature.screenshots.length > 0 && (
                <ScreenshotGallery items={feature.screenshots} />
              )}

              {feature.officialLink && <ExternalLinkCard link={feature.officialLink} />}
            </div>
            {index < experience.features.length - 1 && <div className="mt-10 border-b border-border" />}
          </section>
        ))}

        {experience.responsibilities && (
          <section aria-labelledby="responsibilities-heading">
            <SectionHeading id="responsibilities-heading" eyebrow={nextSection()} title={experience.responsibilities.title} />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {experience.responsibilities.items.map((item) => (
                <HighlightCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        )}

        {experience.officialShowcase && (
          <section aria-labelledby="official-showcase-heading">
            <SectionHeading id="official-showcase-heading" eyebrow={nextSection()} title={experience.officialShowcase.title} />
            <div className={`mt-6 ${showcaseGrid}`}>
              {experience.officialShowcase.items.map((item) => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {experience.lessonsLearned && (
          <section aria-labelledby="lessons-heading">
            <SectionHeading id="lessons-heading" eyebrow={nextSection()} title="Lessons learned" />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {experience.lessonsLearned.map((item) => (
                <HighlightCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
