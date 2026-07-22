import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
      <p className="mono-label text-xs uppercase text-fg-subtle">404</p>
      <h1 className="mt-2 text-2xl font-medium tracking-tight text-fg">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-fg-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to home
      </Link>
    </div>
  );
}
