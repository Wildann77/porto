# Architecture — Wildan Portfolio

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^16.0.1 |
| UI Library | React | ^19.2.0 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4.1.17 |
| Animations | Framer Motion | ^11.0.5 |
| Icons | Lucide React | ^0.553.0 |
| UI Primitives | Radix UI (Slot, Dropdown) | latest |
| Component Variants | class-variance-authority | ^0.6.0 |
| Class Merging | clsx + tailwind-merge | latest |
| Fonts | next/font (Mona Sans via Google) | — |
| Theme | next-themes | ^0.4.6 |
| Headless UI | @headlessui/react | ^2.2.9 |
| Animations (Type) | react-type-animation | ^3.2.0 |
| Analytics | @vercel/analytics | ^1.1.1 |
| Package Manager | bun (also npm compatible) | — |
| Linting | ESLint + eslint-config-next | ^14.1.0 |

---

## Architecture Principles

1. **Next.js App Router** — All routes are in `app/`. Pages are Server Components by default.
2. **Component-Based Architecture** — Each portfolio section is an isolated component.
3. **Client Boundary Delegation** — `app/layout.tsx` remains a Server Component; client state is delegated to `app/client.tsx`.
4. **Design Token System** — All colors are CSS custom properties in `globals.css` using the **OKLCH color space**. Tailwind consumes them via `@theme inline`.
5. **No Backend** — This is a pure frontend project. No API routes, no database, no server-side mutations.

---

## Folder Structure

```
porto/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Server Component) — metadata + Analytics
│   ├── client.tsx              # Client boundary — ThemeProvider, Header, Footer
│   ├── page.tsx                # Home page — section composition
│   ├── globals.css             # Design tokens (OKLCH) + global styles
│   ├── not-found.tsx           # 404 page
│   └── favicon.ico
│
├── components/                 # Feature & layout components
│   ├── hero.tsx                # #home section
│   ├── about.tsx               # #about section
│   ├── experience.tsx          # #experience section
│   ├── projects.tsx            # #projects section
│   ├── education.tsx           # #education section
│   ├── contact.tsx             # #contact section
│   ├── open-source.tsx         # #open-source section
│   ├── skills.tsx              # #skills section (wrapper)
│   ├── skills-content.tsx      # Skills content list
│   ├── skills-visualization.tsx# Skills chart/visual
│   ├── header.tsx              # Fixed nav + active section tracking
│   ├── footer.tsx              # Page footer
│   ├── animated-background.tsx # Decorative background
│   ├── theme-provider.tsx      # next-themes wrapper
│   ├── mode-toggle.tsx         # Light/dark toggle with portal dropdown
│   ├── analytics.tsx           # Vercel Analytics
│   ├── speed-insights.tsx      # Vercel Speed Insights
│   ├── noscript-styles.tsx     # No-JS fallback styles
│   └── ui/                     # Generic UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       └── dropdown-menu.tsx
│
├── lib/                        # Utility functions
│   └── utils.ts                # cn() helper
│
├── public/                     # Static assets
│
├── .agents/                    # AI agent skills
│   └── skills/
│       ├── frontend-design/
│       └── senior-frontend/
│
├── .ai-context/                # AI context docs (this directory)
│
├── tailwind.config.ts          # Tailwind configuration (design tokens mapping)
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
├── components.json             # shadcn/ui CLI config
└── package.json
```

---

## Design System

### Color System (OKLCH)

Colors are defined as CSS custom properties in `app/globals.css` using the OKLCH color space.

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--background` | `oklch(0.94 0.02 345)` | `oklch(0.25 0.03 234)` | Page background |
| `--foreground` | `oklch(0.47 0 0)` | `oklch(0.93 0.02 349)` | Primary text |
| `--primary` | `oklch(0.62 0.18 348)` (pink-rose) | `oklch(0.92 0.08 87)` (warm yellow) | Brand accent |
| `--secondary` | `oklch(0.81 0.07 198)` (teal) | `oklch(0.78 0.08 4)` (soft red) | Secondary accents |
| `--muted` | `oklch(0.88 0.05 212)` | `oklch(0.27 0.01 255)` | Subdued backgrounds |
| `--card` | `oklch(0.95 0.05 86)` | `oklch(0.29 0.03 233)` | Card backgrounds |
| `--border` | `oklch(0.62 0.18 348)` | `oklch(0.39 0.04 242)` | Borders |

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-sans` | Mona Sans (Google Fonts via `next/font`) | Headings and UI |
| `--font-mono` | Fira Code | Body text (default) |
| `--font-serif` | Lora | Decorative text |

### Custom CSS Classes (globals.css)

| Class | Effect | Usage |
|---|---|---|
| `.gradient-text` | Linear gradient text from `--primary` | Name/title displays |
| `.timeline-item` | Left-border timeline with hover `translateX(5px)` | Experience/Education |
| `.project-card` | `hover:-translate-y-1 hover:shadow-lg` | Project cards |
| `.skill-card` | `hover:scale-105 hover:shadow-lg` | Skill badges |

### Theme Configuration

- **Mode**: `darkMode: "class"` in `tailwind.config.ts`
- **Provider**: `next-themes` with `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`
- **Tailwind v4**: Design tokens synced via `@theme inline { --color-*: var(--*) }` in `globals.css`

---

## Coding Standards

### TypeScript
- Strict mode enabled via `tsconfig.json`
- Use `type` imports: `import type { Metadata } from "next"`
- Prefer `interface` for component props, `type` for unions/aliases
- Use `React.ComponentPropsWithoutRef<"element">` for HTML element extension

### Component Structure
```tsx
// 1. Directive (if client)
"use client"

// 2. React/Next imports
import { useState } from "react"
import Link from "next/link"

// 3. Third-party imports
import { motion } from "framer-motion"

// 4. Internal imports (path aliases)
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 5. Types (inline or imported)
interface Props { ... }

// 6. Component (named export preferred for layouts, default for pages/sections)
export default function ComponentName({ prop }: Props) {
  return (...)
}
```

### Path Aliases
- Use `@/` alias for all internal imports (configured in `tsconfig.json`)
- `@/components/...` — component imports
- `@/lib/...` — utility imports
- Never use relative paths like `../../components/...`
