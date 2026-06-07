# AGENTS.md — Wildan Portfolio

## Mission

A personal portfolio website for **Wildan Haifan Jadid**, a Full Stack Software Engineer based in Brebes, Indonesia. Built with Next.js 15 + React 19, this site showcases projects, experience, education, open-source work, and provides a contact form. The goal is to present a **polished, visually distinctive, accessible, and performant** personal brand that is **unforgettable** — not generic AI-generated aesthetics.

---

## Active Skills

This project uses two active skills that MUST govern all implementation decisions:

| Skill | Path | Scope |
|---|---|---|
| `senior-frontend` | `.agents/skills/senior-frontend/SKILL.md` | Performance, architecture, TypeScript, a11y, testing |
| `frontend-design` | `.agents/skills/frontend-design/SKILL.md` | Visual design, typography, motion, aesthetic direction |

**Performance Profile**: `next-app-router` (`.agents/skills/senior-frontend/profiles/next-app-router.json`)

### Performance Targets (Non-Negotiable)
| Metric | Target |
|---|---|
| LCP (mobile 4G, p75) | ≤ 2000ms |
| INP (p75) | ≤ 150ms |
| CLS (p75) | ≤ 0.05 |
| JS Bundle per route (gzip) | ≤ 150 KB |
| Lighthouse Performance | ≥ 85 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |

### Design Mandate (from `frontend-design` skill)
- **Aesthetic Direction**: Refined, editorial, dark-mode-forward with organic/warm accents — reflecting a personal creative engineer identity.
- **Typography**: Pair a distinctive display font (NOT Inter/Roboto/Arial) with a refined mono/body font. Current: Mona Sans + Fira Code.
- **Motion**: Use `framer-motion` for high-impact orchestrated reveals (staggered entry), not scattered micro-interactions.
- **Color**: OKLCH color space, dominant warm-rose/amber palette with cool steel-blue dark background in dark mode.
- **Differentiation**: The one thing visitors remember — the cohesive personality that comes through in every detail.

---

## Critical Rules

> These rules are non-negotiable and apply to every task, every file, every change.

1. **TypeScript First** — Every file must be `.tsx` or `.ts`. No plain `.js` files in `app/` or `components/`.
2. **Client/Server Boundary** — Always reason about RSC vs Client Component. Add `"use client"` only when strictly necessary (event handlers, hooks, browser APIs). `"use client"` on `app/layout.tsx` or `app/page.tsx` is **forbidden**.
3. **No Hardcoded Secrets** — Never write API keys, tokens, or passwords inline. Use `.env.local` and document in `.env.example`.
4. **Tailwind CSS Only** — All styling via Tailwind utility classes + CSS custom properties defined in `globals.css`. No inline `style={{}}` unless for dynamic values that can't be expressed in CSS variables.
5. **Design Token Compliance** — Only use colors/fonts from the design token system (`--primary`, `--background`, `--foreground`, etc.). Never use raw hex/rgb values outside of `globals.css`.
6. **Accessibility (WCAG AA minimum)** — All interactive elements must have `aria-label`, `sr-only` text, or semantic HTML equivalents. Keyboard navigation required. Color contrast minimum 4.5:1.
7. **Performance** — Images must use `next/image`. Never use `<img>` tags directly. Lazy-load heavy components with `dynamic()`. No layout-triggering animation props.
8. **No Behavior Regressions** — Do not alter existing scroll behavior, theme switching logic, or section ID anchors without explicit instruction.
9. **No Generic AI Aesthetics** — No purple-gradient-on-white designs, no Space Grotesk, no cookie-cutter layouts. Every design decision must feel intentional and context-specific.
10. **Forms must validate** — All form inputs must use validation (HTML5 + client-side). Contact form must handle error/success states.

---

## Layer Boundaries

This is a **component-based frontend** project. The layers are:

```
app/ (layout & pages)
  └── Page composition & metadata only
  └── RSC by default, client components via delegation to components/

components/ (feature components)
  └── Section components: hero, about, experience, projects, education, contact, etc.
  └── UI primitives: components/ui/ (button, card, badge, input, dropdown, textarea)
  └── Layout: header, footer, animated-background, theme-provider

hooks/ (custom React hooks — to be created)
  └── Reusable stateful logic: useScrollProgress, useSectionObserver, useFormState

lib/ (utilities)
  └── Pure utility functions only (cn, constants, type definitions)

types/ (TypeScript interfaces — to be created)
  └── Shared type definitions
```

### Layer 1: `app/`
| ✅ Allowed | ❌ Forbidden |
|---|---|
| `export const metadata` (SEO) | Direct UI/JSX business logic |
| Import and compose components | Browser APIs, `useState`, `useEffect` |
| Server-side data fetching (future) | Styling beyond layout wrapper class |
| `layout.tsx`, `page.tsx`, `not-found.tsx` | Writing logic that belongs in `components/` |
| Suspense boundaries for streaming | `"use client"` directive |

### Layer 2: `components/`
| ✅ Allowed | ❌ Forbidden |
|---|---|
| Section rendering & layout | Global state management |
| `"use client"` for interactive sections | Direct `fetch` calls to external APIs |
| `framer-motion` animations | Importing from other section components |
| Consuming Tailwind design tokens | Raw hex/rgb in className |
| Composing `components/ui/*` primitives | Cross-section business logic |
| Custom hooks from `hooks/` | `<img>` tags (use `next/image`) |

### Layer 3: `components/ui/`
| ✅ Allowed | ❌ Forbidden |
|---|---|
| Generic, reusable primitives | Section-specific logic |
| `cva` (class-variance-authority) variants | Framer Motion (use in parent component) |
| `cn()` for class merging | State management |
| Radix UI primitives | Direct API calls |
| Accessible HTML patterns | Non-design-token colors |

### Layer 4: `hooks/`
| ✅ Allowed | ❌ Forbidden |
|---|---|
| `useState`, `useEffect`, `useRef`, `useCallback` | JSX / component rendering |
| Browser API abstraction | Direct `fetch` to external APIs |
| Reusable stateful patterns | Side effects without cleanup |
| Return values only (no JSX) | Global state mutations |

### Layer 5: `lib/`
| ✅ Allowed | ❌ Forbidden |
|---|---|
| Pure utility functions | Imports from `components/` or `app/` |
| Type definitions & constants | Side effects |
| `cn()` helper | DOM manipulation |

---

## Core Domain Rules

### Sections (Portfolio Content)
The portfolio contains these core sections, each as a standalone component:

| Section ID | Component | Nav Label | Status |
|---|---|---|---|
| `#home` | `Hero` | "Home" | Active |
| `#about` | `About` | "About" | Active |
| `#experience` | `Experience` | "Experience" | Active |
| `#projects` | `Projects` | "Projects" | Active |
| `#education` | `Education` | "Education" | Active |
| `#contact` | `Contact` | "Contact Me" | Active |
| `#open-source` | `OpenSource` | — (sub-section of projects) | Active |
| `#skills` | `Skills` | — (sub-section of experience) | Active |

### Section ID Convention
- Every section component **must** have `id="<section-name>"` on its root `<section>` element.
- Section IDs are referenced by the `Header` nav and the `determineActiveSection` scroll logic. **Do not rename or remove existing IDs.**
- Sub-section mapping: `open-source` → highlights as `projects`, `skills` → highlights as `experience`.

### Naming Conventions
| Pattern | Convention |
|---|---|
| Components | `PascalCase` (e.g., `ModeToggle`) |
| Files | `kebab-case.tsx` (e.g., `mode-toggle.tsx`) |
| Custom hooks | `camelCase.ts` (e.g., `useScrollProgress.ts`) in `hooks/` |
| CSS classes | Tailwind utilities + custom class names (e.g., `gradient-text`, `timeline-item`) |
| Section IDs | `kebab-case` matching nav `href` (e.g., `#open-source`) |
| Utility functions | `camelCase` (e.g., `cn()`) |
| TypeScript types | `PascalCase` in `types/` or co-located (e.g., `interface NavItem`) |

### Theme System
- Light/dark mode via `next-themes` + `ThemeProvider` with `attribute="class"`.
- `darkMode: "class"` in `tailwind.config.ts`.
- CSS custom properties defined in `globals.css` using **OKLCH color space**.
- Never hardcode colors outside of `:root {}` and `.dark {}` blocks in `globals.css`.

### Animation Standards (from `senior-frontend` + `frontend-design`)
- Use `framer-motion` for all JS-driven enter/exit animations and layout transitions.
- **Preferred entry pattern**: staggered reveals with `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` + `delay: index * 0.1`.
- **Layout animations**: `layoutId` for active nav indicator (spring transition).
- **Scroll-triggered**: Use Intersection Observer (via custom hook `useInView`) to trigger section animations only when visible.
- **Hover micro-interactions**: `.hover:-translate-y-1`, `.hover:scale-105` for cards.
- **Mobile menu**: height animation with `framer-motion` (not CSS `display:none`).
- **Never**: `@keyframes` for JS-driven animations, `transform: rotate()` that triggers layout, animation on every scroll event.

### Accessibility Standards (WCAG AA — from `senior-frontend`)
- Minimum color contrast: **4.5:1** for normal text, **3:1** for large text.
- All icon-only buttons must have `aria-label` or `<span className="sr-only">`.
- Navigation must have `aria-label="Main navigation"`.
- Form inputs must have `<label>` or `aria-label` + `aria-describedby` for errors.
- Skip link: `<a href="#main-content" className="sr-only focus:not-sr-only">` in layout.
- Focus indicators must be visible (use `focus-visible:ring-2`).

---

## Security & Operations

### Environment Variables
- No secrets currently required. If added in future (email API, etc.):
  - Store in `.env.local`
  - Document keys in `.env.example`
  - Ensure `.env.local` is in `.gitignore` ✅

### Analytics
- `@vercel/analytics` via `<Analytics />` component in `app/layout.tsx`.
- `<SpeedInsights />` available via `components/speed-insights.tsx`.

### Performance Checklist (from `senior-frontend` profile)
- [ ] Images use `next/image` with explicit `width`, `height`, and `priority` for above-fold
- [ ] Heavy components use `dynamic()` with `loading="lazy"` and Suspense fallback
- [ ] `next.config.ts` has `optimizePackageImports: ['lucide-react']`
- [ ] No blocking resources in `<head>`
- [ ] Framer Motion animations only use `transform` + `opacity` (no layout-triggering props)
- [ ] Bundle per route ≤ 150 KB gzip

### Dev Commands
```bash
# Start development server
npm run dev
# or
bun dev

# Lint
npm run lint

# Build for production (must pass before any PR/deploy)
npm run build

# Start production server
npm start

# Type check only
npx tsc --noEmit

# Bundle analysis (when added)
ANALYZE=true npm run build
```

---

## AI Context Map

| Document | Purpose |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | Main AI contract — rules, layers, conventions |
| [`.ai-context/agent-rules/agent-instructions.md`](./.ai-context/agent-rules/agent-instructions.md) | How agent should approach tasks in this repo |
| [`.ai-context/agent-rules/instructions/app.instructions.md`](./.ai-context/agent-rules/instructions/app.instructions.md) | Rules for `app/` layer |
| [`.ai-context/agent-rules/instructions/components.instructions.md`](./.ai-context/agent-rules/instructions/components.instructions.md) | Rules for `components/` layer |
| [`.ai-context/agent-rules/instructions/ui.instructions.md`](./.ai-context/agent-rules/instructions/ui.instructions.md) | Rules for `components/ui/` primitives |
| [`.ai-context/agent-rules/instructions/lib.instructions.md`](./.ai-context/agent-rules/instructions/lib.instructions.md) | Rules for `lib/` utilities |
| [`.ai-context/agent-rules/instructions/hooks.instructions.md`](./.ai-context/agent-rules/instructions/hooks.instructions.md) | Rules for `hooks/` custom React hooks |
| [`.ai-context/docs/architecture.md`](./.ai-context/docs/architecture.md) | Tech stack, folder structure, design system |
| [`.ai-context/docs/domain-rules.md`](./.ai-context/docs/domain-rules.md) | Sections, content rules, naming conventions |
| [`.ai-context/docs/operations.md`](./.ai-context/docs/operations.md) | Dev commands, deployment, analytics |
| [`.ai-context/docs/design-system.md`](./.ai-context/docs/design-system.md) | Design tokens, typography, spacing, motion |
| [`.agents/skills/senior-frontend/SKILL.md`](./.agents/skills/senior-frontend/SKILL.md) | Senior frontend skill — perf, a11y, TS patterns |
| [`.agents/skills/frontend-design/SKILL.md`](./.agents/skills/frontend-design/SKILL.md) | Frontend design skill — aesthetic direction |

---

## Definition of Done

A task is considered **complete** only when ALL of the following are true:

**TypeScript & Lint**
- [ ] TypeScript compiles without errors (`npx tsc --noEmit` passes)
- [ ] No ESLint errors (`npm run lint` is clean)
- [ ] `npm run build` succeeds with 0 errors

**Architecture**
- [ ] No `"use client"` added to `app/layout.tsx` or `app/page.tsx`
- [ ] RSC/Client boundary is correctly placed
- [ ] No raw hex/RGB colors introduced outside `globals.css`

**Design & UX**
- [ ] Visually matches the portfolio's aesthetic direction (OKLCH palette, character typography, motion)
- [ ] All interactive elements have `aria-label` or semantic equivalents
- [ ] New section components have correct `id` attribute matching nav items
- [ ] Animations use `framer-motion` (not CSS `@keyframes`) for JS-driven interactions

**Performance**
- [ ] No placeholder `<img>` tags; use `next/image` instead
- [ ] Heavy components use `dynamic()` if they exceed 30KB JS
- [ ] Framer Motion animations only on `transform`/`opacity` (no layout triggers)

**Responsive & Theme**
- [ ] Dark mode works correctly for any new UI elements (test with `.dark` class)
- [ ] Mobile layout is responsive (test at `375px` width minimum)
- [ ] Tablet layout tested at `768px`

**Accessibility**
- [ ] All form inputs have labels and error handling
- [ ] Color contrast ≥ 4.5:1 for body text
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators are visible (`focus-visible:ring-2`)
