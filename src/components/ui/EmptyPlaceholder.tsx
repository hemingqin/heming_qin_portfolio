import { cn } from "@/lib/cn";

export function EmptyPlaceholder({ text, className }: { text: string; className?: string }) {
  return (
    <p className={cn("rounded-md border border-dashed border-border px-3.5 py-3 text-sm text-fg-subtle", className)}>
      {text}
    </p>
  );
}
