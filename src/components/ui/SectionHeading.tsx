import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, className, id }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-prose", className)}>
      {eyebrow && (
        <p className="mono-label mb-2 text-xs uppercase text-fg-subtle">{eyebrow}</p>
      )}
      <h2 id={id} className="text-xl font-medium tracking-tight text-fg sm:text-2xl">
        {title}
      </h2>
      {description && <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>}
    </div>
  );
}
