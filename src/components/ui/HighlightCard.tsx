import type { HighlightItem } from "@/types/portfolio";

export function HighlightCard({ item }: { item: HighlightItem }) {
  return (
    <div className="rounded-lg border border-border p-6">
      <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
      <p className="mt-3 text-[17px] leading-[1.65] text-fg-muted">{item.summary}</p>
    </div>
  );
}
