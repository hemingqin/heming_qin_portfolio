// ---------------------------------------------------------------------------
// Core content data model
//
// Everything rendered on experience/project detail pages is described by
// these types. Page components read this shape and render it; they never
// hardcode copy. To add or edit content, edit the files in `src/data/*`
// only — you should never need to touch a component to change text.
// ---------------------------------------------------------------------------

export type TemplateType =
  | "technical-system"
  | "commercial-product"
  | "engineering-workflow";

export type MediaKind = "image" | "diagram" | "video";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  /** Path under /public, or an external URL. Leave empty to render a placeholder. */
  src?: string;
  alt: string;
  caption?: string;
}

export interface ExternalLink {
  label: string;
  href: string;
  /** Marks a link whose target the visitor hasn't been given yet. Rendered as disabled. */
  isPlaceholder?: boolean;
  icon?: "github" | "external" | "play" | "file";
}

export interface Metric {
  label: string;
  /** Leave undefined to render an intentional "to be added" empty state instead of a number. */
  value?: string;
  helpText?: string;
}

export interface HighlightItem {
  title: string;
  summary: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  /** Short subtitle rendered under the node label, e.g. a technology name. */
  sublabel?: string;
  /** Optional grouping tier, used to lay nodes out left-to-right or top-to-bottom. */
  tier?: number;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
}

export interface WorkflowStage {
  id: string;
  label: string;
  description?: string;
}

/** A card describing an official product/resource — not necessarily built by the author. */
export interface ShowcaseItem {
  id: string;
  name: string;
  description: string;
  image?: MediaItem;
  officialLink?: ExternalLink;
}

/** A compact product-intro card: image beside a title/description/official link, with no engineering content. */
export interface ProductIntro {
  image: MediaItem;
  title: string;
  description: string;
  officialLink?: ExternalLink;
}

/**
 * One feature deep-dive within a commercial product experience. All narrative
 * fields are optional so a single type can cover both a full background →
 * requirement → contribution → approach → outcome writeup (e.g. a platform
 * feature) and a lighter screenshot-driven writeup (e.g. an app feature).
 */
export interface ProductFeature {
  slug: string;
  name: string;
  background?: string;
  /** Defaults to "Requirement" in the template when omitted. */
  requirementLabel?: string;
  requirement?: string;
  contribution?: string;
  /** Defaults to "Technical Approach" in the template when omitted. */
  technicalApproachLabel?: string;
  technicalApproach?: string;
  outcome?: string;
  /** Compact product-intro card shown at the top of the feature, for features that are platform products rather than a single workflow. */
  productIntro?: ProductIntro;
  workflow?: WorkflowStage[];
  /** Capability/architecture diagram shown as an alternative to a linear `workflow`. */
  architecture?: {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
  };
  screenshots?: MediaItem[];
  officialLink?: ExternalLink;
}

export interface CaseStudySection {
  id: string;
  title: string;
  body?: string;
}

/** One business challenge solved by a `SolutionModule`, plus the engineering work behind it. */
export interface SolutionModule {
  title: string;
  /** The business challenge (by title) this solution addresses. */
  problemSolved: string;
  description: string;
  /** Short supporting points expanding on how the solution works. */
  explanationPoints?: string[];
  /** Brief rationale for the technical approach, shown as a "Why this design?" callout. */
  whyThisDesign?: string;
  screenshot?: MediaItem;
  architecture?: {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
  };
  technologies: string[];
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

interface ExperienceBase {
  slug: string;
  organization: string;
  role: string;
  dates: string;
  location: string;
  shortDescription: string;
  technologies: string[];
  logo?: string;
  template: TemplateType;
  /** GitHub / live demo shown in the hero, when applicable. */
  githubLink?: ExternalLink;
  liveDemoLink?: ExternalLink;
}

export interface TechnicalSystemExperience extends ExperienceBase {
  template: "technical-system";
  /** One-line project description shown in the hero. */
  summary: string;
  /** Narrative background: why the project existed, what changed, and the author's role. */
  overview: CaseStudySection[];
  /** Business problems the previous system caused — not technical problems. */
  challenges: HighlightItem[];
  /** Engineering solutions, each mapped to the business challenge it solves. */
  solutions: SolutionModule[];
  metrics: Metric[];
  /** Short paragraph summarizing the completed platform, shown under the metrics. */
  resultsSummary: string;
  gallery: MediaItem[];
}

export interface CommercialProductExperience extends ExperienceBase {
  template: "commercial-product";
  /** Short descriptor shown under the title in the hero, e.g. "ColorOS Platform". */
  platformTagline: string;
  /** One-line role summary shown as the hero description. */
  roleSummary: string;
  /** Shown as a small notice in the hero. */
  proprietaryNotice: string;
  /** Narrative introduction to the product ecosystem (not individual features). */
  background: CaseStudySection[];
  /** Compact product-intro card shown at the top of the Background section. */
  productIntro?: ProductIntro;
  /** Feature deep-dives, each mapped to a business or user problem. */
  features: ProductFeature[];
  responsibilities?: {
    title: string;
    items: HighlightItem[];
  };
  officialShowcase?: {
    title: string;
    items: ShowcaseItem[];
  };
  lessonsLearned?: HighlightItem[];
}

/** An external publication or research record, shown as a card with a single official link. */
export interface Publication {
  title: string;
  author: string;
  institution: string;
  description: string;
  link: ExternalLink;
}

export interface EngineeringWorkflowExperience extends ExperienceBase {
  template: "engineering-workflow";
  /** Short role/focus line shown as the hero subtitle, e.g. "Research Assistant · Nanophotonics Research". */
  focusTagline: string;
  /** Hero paragraph introducing the interdisciplinary scope of the work. */
  summary: string;
  /** Narrative background: the research environment and the original, manually-organized workflow. */
  background: CaseStudySection[];
  /** The problem framed along its two dimensions: the scientific question and the engineering/data problem. */
  researchProblem: {
    scientificChallenge: string;
    engineeringChallenge: string;
  };
  /** The completed platform: what it centralizes, plus a small note on its pre-release status. */
  platform: {
    description: string;
    capabilities: string[];
    note: string;
  };
  /** Full ownership of design and implementation. */
  myRole: {
    summary: string;
    items: string[];
  };
  architecture: {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
  };
  /** Cross-cutting deployment/infrastructure tooling, shown as tags under the architecture diagram. */
  infrastructure: string[];
  workflow: {
    stages: WorkflowStage[];
    overview?: string;
  };
  platformOutcome: string[];
  researchOutcome: {
    summary: string;
    findings: string[];
  };
  publication: Publication;
}

export type Experience =
  | TechnicalSystemExperience
  | CommercialProductExperience
  | EngineeringWorkflowExperience;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectStatus = "active" | "in-progress" | "archived" | "concept";

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  description: string;
  role: string;
  dates: string;
  technologies: string[];
  overview: CaseStudySection;
  architecture: {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
    explanation?: string;
  };
  challenges: CaseStudySection;
  implementation: CaseStudySection;
  outcomes: CaseStudySection;
  gallery: MediaItem[];
  githubLink?: ExternalLink;
  liveDemoLink?: ExternalLink;
  featured?: boolean;
}
