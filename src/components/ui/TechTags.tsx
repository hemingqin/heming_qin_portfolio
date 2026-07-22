import { cn } from "@/lib/cn";

interface TechTagsProps {
  items: string[];
  className?: string;
  size?: "sm" | "md";
}

export function TechTags({ items, className, size = "sm" }: TechTagsProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "mono-label rounded border border-border bg-bg-subtle text-fg-muted",
            size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs"
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
