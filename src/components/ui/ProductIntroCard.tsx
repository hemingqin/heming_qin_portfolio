import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ProductIntro } from "@/types/portfolio";
import { ExternalLinkCard } from "./ExternalLinkCard";

export function ProductIntroCard({ intro }: { intro: ProductIntro }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
      <figure className="overflow-hidden rounded-lg border border-border bg-bg-subtle">
        <div className="flex aspect-video items-center justify-center bg-bg-inset">
          {intro.image.src ? (
            <Image
              src={intro.image.src}
              alt={intro.image.alt}
              width={640}
              height={360}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-fg-subtle">
              <ImageIcon className="h-5 w-5" aria-hidden />
              <span className="text-xs">Image will be added</span>
            </div>
          )}
        </div>
      </figure>
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-fg">{intro.title}</h3>
        <p className="mt-4 text-lg leading-[1.65] text-fg-muted">{intro.description}</p>
        {intro.officialLink && (
          <div className="mt-4">
            <ExternalLinkCard link={intro.officialLink} />
          </div>
        )}
      </div>
    </div>
  );
}
