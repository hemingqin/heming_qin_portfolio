"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { MediaItem } from "@/types/portfolio";

function GalleryImage({ item }: { item: MediaItem }) {
  const [failed, setFailed] = useState(false);

  if (!item.src || failed) {
    return (
      <div className="flex flex-col items-center gap-2 text-fg-subtle">
        <ImageIcon className="h-5 w-5" aria-hidden />
        <span className="text-xs">Preview unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export function ScreenshotGallery({ items }: { items: MediaItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <ImageIcon className="mx-auto h-5 w-5 text-fg-subtle" aria-hidden />
        <p className="mt-2 text-sm text-fg-subtle">Screenshots will be added.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <figure key={item.id} className="overflow-hidden rounded-lg border border-border bg-bg-subtle">
          <div className="relative flex aspect-video items-center justify-center bg-bg-inset">
            <GalleryImage item={item} />
          </div>
          {item.caption && (
            <figcaption className="border-t border-border px-3 py-2 text-xs text-fg-muted">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
