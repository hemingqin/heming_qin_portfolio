import type { WorkflowStage } from "@/types/portfolio";
import { ArrowRight } from "lucide-react";

export function WorkflowDiagram({ stages }: { stages: WorkflowStage[] }) {
  if (stages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-fg-subtle">
        Workflow diagram will be added.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-bg-subtle p-4 sm:p-6">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2">
        {stages.map((stage, i) => (
          <li key={stage.id} className="flex items-center gap-2 sm:flex-1">
            <div className="flex flex-1 flex-col justify-center rounded-md border border-border-strong bg-bg px-3.5 py-3">
              <span className="mono-label text-[10px] uppercase text-fg-subtle">
                Stage {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-0.5 text-sm font-medium text-fg">{stage.label}</span>
              {stage.description && (
                <span className="mt-1 text-xs leading-relaxed text-fg-muted">{stage.description}</span>
              )}
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-fg-subtle sm:block" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
