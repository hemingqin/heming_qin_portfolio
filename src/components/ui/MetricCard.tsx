import type { Metric } from "@/types/portfolio";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="mono-label text-[11px] uppercase text-fg-subtle">{metric.label}</p>
      {metric.value ? (
        <p className="mt-1.5 text-2xl font-medium tracking-tight text-fg">{metric.value}</p>
      ) : (
        <p className="mt-1.5 text-sm text-fg-subtle">Value will be added.</p>
      )}
      {metric.helpText && <p className="mt-1 text-xs text-fg-muted">{metric.helpText}</p>}
    </div>
  );
}
