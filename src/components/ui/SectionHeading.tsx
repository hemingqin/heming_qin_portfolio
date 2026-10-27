import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, className, id, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-prose", className)}>
      {eyebrow && (
        <p className="mono-label mb-2 text-xs uppercase text-fg-subtle">{eyebrow}</p>
      )}
      <Heading id={id} className={cn("font-semibold leading-tight tracking-tight text-fg", Heading === "h1" ? "text-[40px] sm:text-5xl" : "text-2xl sm:text-[28px]")}>
        {title}
      </Heading>
      {description && <p className="mt-4 text-lg leading-[1.65] text-fg-muted">{description}</p>}
    </div>
  );
}
