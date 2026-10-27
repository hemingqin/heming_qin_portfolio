import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";
import { TechTags } from "@/components/ui/TechTags";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience across full-stack, mobile, and research engineering.",
};

const templateLabel = {
  "technical-system": "System case study",
  "commercial-product": "Product contribution",
  "engineering-workflow": "Research workflow",
} as const;

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading as="h1"
        eyebrow="Experience"
        title="Professional experience"
        description="An index of roles I've held. Each one leads to a detailed page covering context, contribution, and engineering decisions."
      />

      <ol className="mt-10 divide-y divide-border border-t border-border">
        {experiences.map((experience) => (
          <li key={experience.slug}>
            <Link
              href={`/experience/${experience.slug}`}
              className="group grid grid-cols-1 gap-6 py-9 transition-colors hover:bg-bg-subtle sm:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] sm:items-start sm:gap-10"
            >
              <div>
                <p className="mono-label text-[13px] uppercase text-fg-muted">
                  {templateLabel[experience.template]}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
                  {experience.organization}
                </h2>
                <p className="mt-2 text-lg text-fg">{experience.role}</p>
                <p className="mt-4 max-w-prose text-[17px] leading-[1.65] text-fg-muted">{experience.shortDescription}</p>
                <TechTags items={experience.technologies} className="mt-5" />
              </div>
              <div className="text-sm text-fg-muted sm:pt-1 sm:text-right">
                <p>{experience.dates}</p>
                <p className="mt-2">{experience.location}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-base font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors group-hover:decoration-fg">
                  Explore experience
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
