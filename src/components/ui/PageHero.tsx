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
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-20">
        {eyebrow && <p className="mono-label text-xs uppercase text-fg-subtle">{eyebrow}</p>}
        <h1 className="mt-2 text-[40px] font-semibold leading-tight tracking-tight text-fg sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-prose text-2xl tracking-tight text-fg sm:text-[28px]">{subtitle}</p>}
        {description && <p className="mt-6 max-w-prose text-lg leading-[1.65] text-fg-muted">{description}</p>}

        {meta && meta.length > 0 && (
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-7">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[13px] font-medium text-fg-muted">{m.label}</dt>
                <dd className="mt-2 text-base text-fg">{m.value}</dd>
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
