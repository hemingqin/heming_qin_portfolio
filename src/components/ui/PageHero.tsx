import type { ReactNode } from "react";
import { TechTags } from "./TechTags";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  technologies?: string[];
  meta?: { label: string; value: string }[];
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, description, technologies, meta, actions }: PageHeroProps) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow && <p className="mono-label text-xs uppercase text-fg-subtle">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-fg sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-base text-fg-muted">{subtitle}</p>}
        {description && <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">{description}</p>}

        {meta && meta.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="mono-label text-[11px] uppercase text-fg-subtle">{m.label}</dt>
                <dd className="text-sm text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {technologies && technologies.length > 0 && <TechTags items={technologies} size="md" className="mt-6" />}

        {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
