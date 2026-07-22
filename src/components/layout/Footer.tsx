import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-fg-subtle">
          &copy; {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
          >
            <Mail className="h-4 w-4" aria-hidden />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href={site.social.github}
            className="flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github className="h-4 w-4" aria-hidden />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={site.social.linkedin}
            className="flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
