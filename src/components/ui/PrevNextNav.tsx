import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavTarget {
  label: string;
  href: string;
}

export function PrevNextNav({
  prev,
  next,
  indexHref,
  indexLabel = "Back to index",
}: {
  prev?: NavTarget;
  next?: NavTarget;
  indexHref: string;
  indexLabel?: string;
}) {
  return (
    <nav aria-label="Related" className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <Link href={indexHref} className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {indexLabel}
      </Link>
      <div className="flex items-center gap-3">
        {prev && (
          <Link href={prev.href} className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {prev.label}
          </Link>
        )}
        {next && (
          <Link href={next.href} className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg">
            {next.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
    </nav>
  );
}
