import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft, Download, FileWarning } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Resume",
  description: `Download or preview ${site.name}'s resume.`,
};

function resumeExists(): boolean {
  try {
    const filePath = path.join(process.cwd(), "public", site.resumePdfPath.replace(/^\//, ""));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export default function ResumePage() {
  const hasResume = resumeExists();

  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <SectionHeading as="h1"
        eyebrow="Resume"
        title="Resume"
        description="A condensed summary of my professional experience. For more detail on any individual role, visit the Experience section."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {hasResume ? (
          <a
            href={site.resumePdfPath}
            download
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download resume
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-dashed border-border px-4 py-2 text-sm text-fg-subtle"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download resume
          </span>
        )}
        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to experience
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-bg-subtle">
        {hasResume ? (
          <object data={site.resumePdfPath} type="application/pdf" className="h-[80vh] w-full" aria-label="Resume preview">
            <p className="p-6 text-sm text-fg-muted">
              Your browser can&apos;t preview PDFs inline.{" "}
              <a href={site.resumePdfPath} className="text-accent underline underline-offset-2">
                Open the resume directly
              </a>
              .
            </p>
          </object>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-24 text-center">
            <FileWarning className="h-6 w-6 text-fg-subtle" aria-hidden />
            <p className="text-sm text-fg-subtle">
              Resume not yet added. Place a PDF at{" "}
              <code className="mono-label rounded bg-bg-inset px-1.5 py-0.5 text-xs">
                /public{site.resumePdfPath}
              </code>{" "}
              to enable preview and download.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
