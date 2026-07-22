import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences, getExperienceBySlug } from "@/data/experiences";
import { TechnicalSystemTemplate } from "@/components/templates/TechnicalSystemTemplate";
import { CommercialProductTemplate } from "@/components/templates/CommercialProductTemplate";
import { EngineeringWorkflowTemplate } from "@/components/templates/EngineeringWorkflowTemplate";
import { PrevNextNav } from "@/components/ui/PrevNextNav";

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) return {};
  return {
    title: `${experience.organization} — ${experience.role}`,
    description: experience.shortDescription,
  };
}

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) notFound();

  const index = experiences.findIndex((e) => e.slug === experience.slug);
  const prev = experiences[index - 1];
  const next = experiences[index + 1];

  return (
    <>
      {experience.template === "technical-system" && <TechnicalSystemTemplate experience={experience} />}
      {experience.template === "commercial-product" && <CommercialProductTemplate experience={experience} />}
      {experience.template === "engineering-workflow" && <EngineeringWorkflowTemplate experience={experience} />}

      <div className="mx-auto max-w-content px-4 pb-14 sm:px-6">
        <PrevNextNav
          indexHref="/experience"
          indexLabel="Back to experience"
          prev={prev ? { label: prev.organization, href: `/experience/${prev.slug}` } : undefined}
          next={next ? { label: next.organization, href: `/experience/${next.slug}` } : undefined}
        />
      </div>
    </>
  );
}
