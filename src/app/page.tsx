import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, FileText, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { experiences, getExperienceBySlug } from "@/data/experiences";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { TechTags } from "@/components/ui/TechTags";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  const obvs = getExperienceBySlug("obvs");

  return (
    <>
      {/* Hero */}
      <section className="dotted-grid border-b border-border">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28">
          <p className="mono-label text-xs uppercase text-fg-subtle">{site.role}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-fg sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {site.positioningStatement}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              View experience
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
            >
              <FileText className="h-4 w-4" aria-hidden />
              View resume
            </Link>
            <Link
              href={site.social.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </Link>
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Experience */}
      <section aria-labelledby="experience-heading" className="border-b border-border">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading id="experience-heading" eyebrow="Selected experience" title="Where I've worked" />
            <Link
              href="/experience"
              className="hidden shrink-0 items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg sm:inline-flex"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences
              .filter((experience) => experience.slug !== "obvs")
              .map((experience) => (
                <ExperienceCard key={experience.slug} experience={experience} />
              ))}
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section aria-labelledby="projects-heading" className="border-b border-border">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading id="projects-heading" eyebrow="Selected projects" title="Things I've built" />
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg sm:inline-flex"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          {obvs && (
            <div className="mt-8 rounded-lg border border-border bg-bg-subtle p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
                <div className="lg:col-span-3">
                  <span className="mono-label inline-flex items-center gap-1.5 rounded bg-positive/10 px-1.5 py-0.5 text-[11px] uppercase text-positive">
                    <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden />
                    Live / Production
                  </span>
                  <h3 className="mt-3 text-xl font-medium tracking-tight text-fg sm:text-2xl">
                    OBVS — Volunteer Management Platform
                  </h3>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-muted">
                    A cloud-based operational platform for Oak Bay Volunteer Services, supporting volunteer
                    coordination, donations, internal workflows, and real-time administrative operations.
                  </p>
                  <TechTags items={obvs.technologies} size="md" className="mt-5" />
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/experience/${obvs.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                    >
                      View case study
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    {obvs.liveDemoLink && !obvs.liveDemoLink.isPlaceholder && (
                      <Link
                        href={obvs.liveDemoLink.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-inset"
                      >
                        Live application
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-6 self-start lg:col-span-2 lg:border-l lg:border-border lg:pl-8">
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-fg">80+</p>
                    <p className="mt-1 text-xs leading-relaxed text-fg-subtle">Concurrent users</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-fg">~30%</p>
                    <p className="mt-1 text-xs leading-relaxed text-fg-subtle">Faster backend responses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-fg">Real-time</p>
                    <p className="mt-1 text-xs leading-relaxed text-fg-subtle">WebSocket + Redis</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-fg">AWS</p>
                    <p className="mt-1 text-xs leading-relaxed text-fg-subtle">Production deployment</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact summary */}
      <section aria-labelledby="contact-heading">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <SectionHeading id="contact-heading" eyebrow="Get in touch" title="Contact" />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-border p-4">
              <MapPin className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
              <span className="text-sm text-fg-muted">{site.location}</span>
            </div>
            <Link
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-border-strong hover:bg-bg-subtle"
            >
              <Mail className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
              <span className="text-sm text-fg-muted">{site.email}</span>
            </Link>
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-border-strong hover:bg-bg-subtle"
            >
              <Linkedin className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
              <span className="text-sm text-fg-muted">LinkedIn</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
