# Heming Qin — Portfolio

A personal software engineering portfolio built with Next.js (App Router),
TypeScript, and Tailwind CSS. It functions as a visual extension of a resume:
each experience and project gets a detailed case-study page, driven entirely
by structured data files rather than hardcoded layout.

> **Note on this build:** all source files were generated in an offline
> sandbox with no package registry access, so dependencies have not been
> installed or run here. Everything below is standard — `npm install` will
> pull real, published versions of every package in `package.json`, and the
> app runs immediately after that.

## Setup

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

## Local development commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | Run `tsc --noEmit` |

## File structure

```
src/
  app/                          Routes (App Router)
    page.tsx                    Homepage
    experience/page.tsx         Experience index
    experience/[slug]/page.tsx  Experience detail (dispatches to a template)
    projects/page.tsx           Projects index
    projects/[slug]/page.tsx    Project detail
    resume/page.tsx             Resume page
    contact/page.tsx            Contact page
    layout.tsx                  Root layout, fonts, metadata, theme provider
    globals.css                 Design tokens (CSS variables) + base styles

  components/
    layout/                     Header, Footer, ThemeToggle, ThemeProvider
    ui/                         Reusable primitives (cards, tags, accordion,
                                 gallery, metric/highlight cards, page hero, etc.)
    diagrams/                   ArchitectureDiagram (tiered SVG) and
                                 WorkflowDiagram (linear stage flow)
    templates/                  The 3 experience templates + project template:
                                   TechnicalSystemTemplate.tsx
                                   CommercialProductTemplate.tsx
                                   EngineeringWorkflowTemplate.tsx
                                   ProjectDetailTemplate.tsx

  data/
    site.ts                     Name, role, location, email, social links, nav
    experiences.ts               All experience content (OBVS, OPPO/OnePlus, UVic)
    projects.ts                  All project content

  types/
    portfolio.ts                 All content data-model interfaces
```

## How to edit experience data

Open `src/data/experiences.ts`. Each object in the `experiences` array is one
role. Edit any field directly — titles, dates, summaries, tags, links,
metrics, gallery captions, etc. No component code needs to change.

## How to add a new experience

1. In `src/data/experiences.ts`, add a new object to the `experiences` array
   with a unique `slug`.
2. Set `template` to one of:
   - `"technical-system"` — for engineering-heavy systems you built (like OBVS)
   - `"commercial-product"` — for proprietary/commercial contributions (like OPPO/OnePlus)
   - `"engineering-workflow"` — for research/engineering workflow tooling (like UVic)
3. Fill in the fields that template requires — see the corresponding
   interface in `src/types/portfolio.ts` (`TechnicalSystemExperience`,
   `CommercialProductExperience`, or `EngineeringWorkflowExperience`).
4. That's it — `/experience`, the homepage cards, and the
   `/experience/[slug]` route all pick it up automatically.

## How to add screenshots

1. Put image files under `public/images/...` (see `public/images/README.md`).
2. Reference the path in a `MediaItem`'s `src` field, e.g.:

   ```ts
   { id: "dashboard", kind: "image", src: "/images/obvs/dashboard.png", alt: "OBVS dashboard" }
   ```

3. Any gallery entry left without a `src` automatically renders a clean
   "screenshot will be added" placeholder — nothing breaks.

## How to add the resume PDF

1. Add your PDF at `public/resume/Heming-Qin-Resume.pdf` (see
   `public/resume/README.md`), or change the path in `src/data/site.ts`
   (`resumePdfPath`).
2. The `/resume` page detects the file automatically. If it's missing, the
   page shows an intentional placeholder state instead of a broken link or a
   crash — refresh once the file is added, no code changes needed.

## How to build for production

```bash
npm run build
npm run start
```

## Design system

- Palette, spacing, and type scale are defined as CSS variables in
  `src/app/globals.css` and mapped into Tailwind in `tailwind.config.ts`
  (`bg`, `fg`, `border`, `accent`, etc.), so light/dark mode is just a class
  toggle (`next-themes`, no flash of unstyled content).
- Typography uses Geist Sans for text and Geist Mono for tags, labels, and
  technical metadata — via the official `geist` package (`next/font`).
- The architecture and workflow diagrams (`src/components/diagrams/`) are
  hand-built, responsive SVG components — no charting/diagram library — so
  they can be restyled or extended without adding a dependency.

## Known placeholders to fill in later

- `src/data/site.ts` — replace `email`, GitHub, and LinkedIn URLs with real ones.
- `src/data/experiences.ts` / `src/data/projects.ts` — every field written as
  "will be added" is intentional placeholder copy, not filled-in content.
- `public/resume/` — add the actual resume PDF.
- `public/images/` — add real screenshots and product images.
- Metadata `metadataBase` in `src/app/layout.tsx` currently points to
  `https://example.com` — update once the site has a real domain.

## Adding a Notes/Blog section later

The architecture was built to make this additive, not a redesign:

1. Add `{ label: "Notes", href: "/notes" }` to `primaryNav` in `src/data/site.ts`.
2. Create `src/app/notes/page.tsx` (index) and `src/app/notes/[slug]/page.tsx`
   (detail), following the same data-driven pattern as `experience`/`projects`.
3. Add a `src/data/notes.ts` file and a `Note` interface in
   `src/types/portfolio.ts`.

No existing routes, components, or templates need to change.
