import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/types/portfolio";
import { TechTags } from "./TechTags";

const templateLabel: Record<Experience["template"], string> = {
  "technical-system": "System case study",
  "commercial-product": "Product contribution",
  "engineering-workflow": "Research workflow",
};

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      href={`/experience/${experience.slug}`}
      className="group flex flex-col justify-between rounded-lg border border-border bg-bg p-6 transition-colors hover:border-border-strong hover:bg-bg-inset"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mono-label text-[13px] uppercase text-fg-subtle">
              {templateLabel[experience.template]}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">{experience.organization}</h3>
            <p className="mt-2 text-[17px] text-fg-muted">{experience.role}</p>
          </div>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-fg"
            aria-hidden
          />
        </div>
        <p className="mt-5 text-base leading-[1.65] text-fg-muted">{experience.shortDescription}</p>
      </div>
      <TechTags items={experience.technologies} className="mt-6" />
    </Link>
  );
}
