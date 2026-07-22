import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

const rows = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "View profile",
    href: site.social.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "View profile",
    href: site.social.github,
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
    href: undefined,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
      <SectionHeading eyebrow="Contact" title="Get in touch" description="The fastest way to reach me is by email." />

      <div className="mt-10 divide-y divide-border border-y border-border">
        {rows.map((row) => {
          const Icon = row.icon;
          const content = (
            <>
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
                <span className="mono-label text-xs uppercase text-fg-subtle">{row.label}</span>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-fg">
                {row.value}
                {row.external && <ArrowUpRight className="h-3.5 w-3.5 text-fg-subtle" aria-hidden />}
              </span>
            </>
          );

          if (row.href) {
            return (
              <Link
                key={row.label}
                href={row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noreferrer noopener" : undefined}
                className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-bg-subtle"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={row.label} className="flex items-center justify-between gap-4 py-4">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
