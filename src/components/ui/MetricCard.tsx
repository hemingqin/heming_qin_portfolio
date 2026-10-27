import type { Metric } from "@/types/portfolio";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="rounded-lg border border-border p-6">
      <p className="mono-label text-[13px] uppercase text-fg-muted">{metric.label}</p>
      {metric.value ? (
        <p className="mt-1.5 text-3xl font-semibold tracking-tight text-fg">{metric.value}</p>
      ) : (
        <p className="mt-1.5 text-sm text-fg-muted">Value will be added.</p>
      )}
      {metric.helpText && <p className="mt-1 text-base leading-relaxed text-fg-muted">{metric.helpText}</p>}
    </div>
  );
}
