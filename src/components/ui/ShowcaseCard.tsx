import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ShowcaseItem } from "@/types/portfolio";
import { ExternalLinkCard } from "./ExternalLinkCard";

export function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-subtle">
      <div className="flex aspect-video items-center justify-center bg-bg-inset">
        {item.image?.src ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={400}
            height={225}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-fg-subtle">
            <ImageIcon className="h-5 w-5" aria-hidden />
            <span className="text-xs">Image will be added</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-fg">{item.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.description}</p>
        {item.officialLink && (
          <div className="mt-3">
            <ExternalLinkCard link={item.officialLink} />
          </div>
        )}
      </div>
    </div>
  );
}
