import Link from "next/link";
import { ExternalLinkIcon, Github, FileText, PlayCircle } from "lucide-react";
import type { ExternalLink } from "@/types/portfolio";
import { cn } from "@/lib/cn";

const icons = {
  github: Github,
  external: ExternalLinkIcon,
  play: PlayCircle,
  file: FileText,
};

export function ExternalLinkCard({ link }: { link: ExternalLink }) {
  const Icon = icons[link.icon ?? "external"];

  if (link.isPlaceholder) {
    return (
      <span
        aria-disabled="true"
        title="Link will be added"
        className="mono-label inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-fg-subtle"
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {link.label}
      </span>
    );
  }

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "mono-label inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {link.label}
    </Link>
  );
}
