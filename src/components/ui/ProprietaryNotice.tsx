import { Lock } from "lucide-react";

export function ProprietaryNotice({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-border bg-bg-subtle px-3.5 py-3 text-xs text-fg-muted">
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-subtle" aria-hidden />
      <p>{text}</p>
    </div>
  );
}
