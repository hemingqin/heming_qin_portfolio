// ---------------------------------------------------------------------------
// Site-wide configuration: navigation, identity, and contact placeholders.
// Edit the values below — no component changes required.
// ---------------------------------------------------------------------------

export const site = {
  name: "Heming Qin",
  role: "Software Engineer",
  positioningStatement:
    "Building reliable software systems across backend services, engineering workflows, and user-facing applications.",
  location: "Victoria, BC",
  email: "hemingqinqin@gmail.com", // placeholder — replace with real email
  resumePdfPath: "/resume/Heming-Qin-Resume.pdf", // placeholder — add the file to enable download
  social: {
    github: "https://github.com/hemingqin", // placeholder
    linkedin: "https://www.linkedin.com/in/heming-qin-b5114729a/", // placeholder
  },
};

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
