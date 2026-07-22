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
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Experience"
        title="Professional experience"
        description="An index of roles I've held. Each one leads to a detailed page covering context, contribution, and engineering decisions."
      />

      <ol className="mt-10 divide-y divide-border border-t border-border">
        {experiences.map((experience) => (
          <li key={experience.slug}>
            <Link
              href={`/experience/${experience.slug}`}
              className="group grid grid-cols-1 gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
            >
              <div>
                <p className="mono-label text-[11px] uppercase text-fg-subtle">
                  {templateLabel[experience.template]}
                </p>
                <h2 className="mt-1 text-lg font-medium text-fg">
                  {experience.organization}
                  <span className="font-normal text-fg-muted"> — {experience.role}</span>
                </h2>
                <p className="mt-1 text-sm text-fg-muted">
                  {experience.dates} &middot; {experience.location}
                </p>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-fg-muted">{experience.shortDescription}</p>
                <TechTags items={experience.technologies} className="mt-3" />
              </div>
              <span className="mono-label inline-flex items-center gap-1 self-start text-xs text-fg-muted transition-colors group-hover:text-accent">
                Explore experience
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
