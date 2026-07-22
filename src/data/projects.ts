import type { Project } from "@/types/portfolio";

// ---------------------------------------------------------------------------
// Project data
//
// Personal / engineering projects not represented as formal employment.
// To add a project: append an object with a unique `slug` below. It will
// automatically appear on /projects and get a detail page at
// /projects/[slug].
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "additional-project-placeholder",
    title: "Additional Project Placeholder",
    status: "concept",
    description: "Project context will be added.",
    role: "Role will be added.",
    dates: "Dates will be added.",
    technologies: [],
    overview: { id: "overview", title: "Overview", body: "Project overview will be added." },
    architecture: { nodes: [], connections: [], explanation: undefined },
    challenges: { id: "challenges", title: "Challenges", body: "Challenges will be added." },
    implementation: { id: "implementation", title: "Implementation", body: "Implementation details will be added." },
    outcomes: { id: "outcomes", title: "Outcomes", body: "Outcome details will be added." },
    gallery: [],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
