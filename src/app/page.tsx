import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { site } from "@/data/site";
import { experiences, getExperienceBySlug } from "@/data/experiences";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { TechTags } from "@/components/ui/TechTags";
import { SectionHeading } from "@/components/ui/SectionHeading";

function PersonalPhoto({
  filename,
  alt,
  portrait = false,
}: {
  filename: string;
  alt: string;
  portrait?: boolean;
}) {
  const src = `/images/personal/${filename}`;
  const available = existsSync(
    path.join(process.cwd(), "public", "images", "personal", filename),
  );

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-bg-subtle ${portrait ? "aspect-[4/5] w-full max-w-[320px] lg:max-w-[340px]" : "aspect-[4/3] w-full"}`}
    >
      {available ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            portrait
              ? "(min-width: 1024px) 340px, (min-width: 640px) 320px, calc(100vw - 32px)"
              : "(min-width: 1180px) 546px, (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 32px)"
          }
          priority={portrait}
          className={
            portrait ? "object-cover object-[center_65%]" : "object-contain"
          }
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-fg-muted">
          {portrait ? "Portrait coming soon" : "Photo coming soon"}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const obvs = getExperienceBySlug("obvs");

  return (
    <>
      {/* Hero */}
      <section className="dotted-grid border-b border-border">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
          <div className="min-w-0">
            <p className="text-base font-medium text-fg-muted">{site.role}</p>
            <h1 className="mt-3 max-w-2xl text-[44px] font-semibold leading-tight tracking-tight text-fg sm:text-[56px]">
              {site.name}
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-[1.65] text-fg-muted">
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
          <div className="flex min-w-0 justify-center lg:justify-end">
            <PersonalPhoto
              filename="hero-gardening.jpeg"
              alt="Portrait of Heming Qin holding white lilies in a garden."
              portrait
            />
          </div>
        </div>
      </section>

      {/* Selected Experience */}
      <section
        aria-labelledby="experience-heading"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              id="experience-heading"
              eyebrow="Selected experience"
              title="Where I've worked"
            />
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
      <section
        aria-labelledby="projects-heading"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              id="projects-heading"
              eyebrow="Selected projects"
              title="Things I've built"
            />
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
                  <span className="mono-label inline-flex items-center gap-1.5 rounded bg-positive/10 px-1.5 py-0.5 text-[13px] uppercase text-positive">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-positive"
                      aria-hidden
                    />
                    Live / Production
                  </span>
                  <h3 className="mt-3 text-[26px] font-semibold tracking-tight text-fg sm:text-[32px]">
                    OBVS — Volunteer Management Platform
                  </h3>
                  <p className="mt-3 max-w-prose text-lg leading-[1.65] text-fg-muted">
                    A cloud-based operational platform for Oak Bay Volunteer
                    Services, supporting volunteer coordination, donations,
                    internal workflows, and real-time administrative operations.
                  </p>
                  <TechTags
                    items={obvs.technologies}
                    size="md"
                    className="mt-5"
                  />
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
                    <p className="text-3xl font-semibold tracking-tight text-fg">
                      80+
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-fg-muted">
                      Concurrent users
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-fg">
                      ~30%
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-fg-muted">
                      Faster backend responses
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-fg">
                      Real-time
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-fg-muted">
                      WebSocket + Redis
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-fg">
                      AWS
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-fg-muted">
                      Production deployment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        aria-labelledby="beyond-code-heading"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            id="beyond-code-heading"
            title="Beyond the Code"
            description="A little about me outside of software engineering."
          />
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
            <article className="min-w-0">
              <PersonalPhoto
                filename="indoor-garden.jpg"
                alt="Indoor collection of orchids, carnivorous plants, and tropical plants."
              />
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Gardening &amp; Plant Cultivation
              </h3>
              <p className="mt-3 max-w-prose text-[17px] leading-[1.65] text-fg-muted">
                Outside of coding, I enjoy growing orchids, carnivorous plants,
                and other tropical species. I like experimenting with indoor
                growing environments and learning about different plants.
              </p>
            </article>
            <article className="min-w-0">
              <PersonalPhoto
                filename="my-cat.jpg"
                alt="Heming Qin holding his black cat."
              />
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Life with My Cat
              </h3>
              <p className="mt-3 max-w-prose text-[17px] leading-[1.65] text-fg-muted">
                When I&apos;m not working on software or taking care of plants,
                you&apos;ll probably find me spending time with my cat.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact summary */}
      <section aria-labelledby="contact-heading">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            id="contact-heading"
            eyebrow="Get in touch"
            title="Contact"
          />
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
              <span className="break-all text-base text-fg-muted">
                {site.email}
              </span>
            </Link>
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-border-strong hover:bg-bg-subtle"
            >
              <Linkedin
                className="h-4 w-4 shrink-0 text-fg-subtle"
                aria-hidden
              />
              <span className="text-sm text-fg-muted">LinkedIn</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
