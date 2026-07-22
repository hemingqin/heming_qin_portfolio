import type { HighlightItem } from "@/types/portfolio";

export function HighlightCard({ item }: { item: HighlightItem }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="text-sm font-medium text-fg">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.summary}</p>
    </div>
  );
}
