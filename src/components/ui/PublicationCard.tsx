import type { Publication } from "@/types/portfolio";
import { ExternalLinkCard } from "./ExternalLinkCard";

export function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <div className="max-w-prose rounded-lg border border-border bg-bg-subtle p-5 sm:p-6">
      <p className="mono-label text-[11px] uppercase text-fg-subtle">{publication.institution}</p>
      <h3 className="mt-1.5 text-lg font-medium tracking-tight text-fg">{publication.title}</h3>
      <p className="mt-1 text-sm text-fg-muted">{publication.author}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{publication.description}</p>
      <div className="mt-4">
        <ExternalLinkCard link={publication.link} />
      </div>
    </div>
  );
}
