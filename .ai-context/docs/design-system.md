# Design System — Wildan Portfolio

> Source of truth for all visual and motion decisions. Governed by the `frontend-design` skill.

---

## Aesthetic Direction

**Identity**: Refined editorial — a personal creative engineer who values craft, precision, and warmth.

**The one thing visitors remember**: The cohesive personality — where dark steel-blue backgrounds meet warm rose-amber accents, and every element feels intentionally placed.

**Anti-patterns (forbidden)**:
- Purple-gradient-on-white (generic AI aesthetic)
- Space Grotesk or Inter as primary font
- Cookie-cutter grid layouts with no personality
- Scattered micro-animations with no choreography
- Plain card designs with zero elevation or texture

---

## Color System (OKLCH)

All colors are defined as CSS custom properties in `app/globals.css` using **OKLCH color space** for perceptual uniformity.

### Design Intent
| Role | Light Mode | Dark Mode | Intent |
|---|---|---|---|
| Background | Warm blush (`oklch(0.94 0.02 345)`) | Cool steel-blue (`oklch(0.25 0.03 234)`) | Page atmosphere |
| Foreground | Dark neutral (`oklch(0.47 0 0)`) | Warm off-white (`oklch(0.93 0.02 349)`) | Primary reading text |
| Primary | Rose-pink (`oklch(0.62 0.18 348)`) | Warm amber-yellow (`oklch(0.92 0.08 87)`) | Brand accent, CTAs |
| Secondary | Teal-cyan (`oklch(0.81 0.07 198)`) | Soft red-pink (`oklch(0.78 0.08 4)`) | Supporting accent |
| Muted | Cool teal-grey (`oklch(0.88 0.05 212)`) | Deep navy (`oklch(0.27 0.01 255)`) | Subdued backgrounds |
| Card | Warm cream (`oklch(0.95 0.05 86)`) | Elevated steel (`oklch(0.29 0.03 233)`) | Surface elevation |
| Border | Rose-pink (`oklch(0.62 0.18 348)`) | Muted navy (`oklch(0.39 0.04 242)`) | Subtle separation |

### Token Usage Rules
```css
/* ✅ Use tokens — always */
color: var(--foreground);
background-color: var(--card);
border-color: var(--border);

/* ❌ Never hardcode — forbidden outside globals.css */
color: #1a1a2e;
background-color: rgb(245, 235, 240);
```

### Tailwind Token Mapping (via `@theme inline` in globals.css)
```
bg-background        → var(--background)
bg-card              → var(--card)
text-foreground      → var(--foreground)
text-primary         → var(--primary)
text-muted-foreground → var(--muted-foreground)
border-border        → var(--border)
ring-ring            → var(--ring)
```

---

## Typography

### Font Stack
| Variable | Font | Source | Usage |
|---|---|---|---|
| `--font-sans` | **Mona Sans** | `next/font/google` | Display headings, nav, UI labels |
| `--font-mono` | **Fira Code** | CSS `@font-face` / system | Body text (default body font) |
| `--font-serif` | **Lora** | CSS definition | Decorative / editorial pull quotes |

### Typography Scale (Tailwind)
| Class | Use Case |
|---|---|
| `text-6xl font-bold` | Hero `<h1>` name |
| `text-4xl font-bold` | Section headings `<h2>` |
| `text-2xl font-semibold` | Sub-headings, card titles |
| `text-xl` | Lead paragraph / intro text |
| `text-base` / `text-sm` | Body content (rendered in Fira Code) |
| `text-xs` | Metadata, dates, tags |

### Typography Rules
- **Single `<h1>` per page** — always the owner's name in `Hero`.
- **Section headings are `<h2>`** — never skip heading levels.
- **`gradient-text`** class applies the brand gradient to text — use sparingly (hero name, section labels).
- **Never use Inter, Roboto, or Arial** as primary fonts.

---

## Spacing & Layout

### Container
```tsx
<div className="container px-4 md:px-6 mx-auto">
```
- Max width: controlled by Tailwind's `container` with responsive padding.
- All sections use `py-20` (mobile) or `py-32` (desktop) vertical padding.

### Grid System
| Pattern | Class |
|---|---|
| 1-column mobile, 2-col tablet | `grid grid-cols-1 md:grid-cols-2 gap-6` |
| 1-col mobile, 3-col desktop | `grid grid-cols-1 lg:grid-cols-3 gap-6` |
| Flex row with wrapping | `flex flex-wrap gap-4` |

### Responsive Breakpoints
| Breakpoint | Prefix | Width |
|---|---|---|
| Mobile (default) | — | `< 640px` |
| Small | `sm:` | `≥ 640px` |
| Medium (tablet) | `md:` | `≥ 768px` |
| Large (desktop) | `lg:` | `≥ 1024px` |
| XLarge | `xl:` | `≥ 1280px` |

---

## Motion System

### Philosophy (from `frontend-design` skill)
> One well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions. Focus on **high-impact moments**.

### Entry Animation (Standard)
```tsx
// Staggered children reveal — use on section containers
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}
```

### Scroll-Triggered (via `useInView` hook)
```tsx
const { ref, isInView } = useInView({ threshold: 0.1, once: true })

<motion.section
  ref={ref}
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
```

### Hover Interactions
| Pattern | Class / Code |
|---|---|
| Card lift | `hover:-translate-y-1 transition-transform` or `.project-card` |
| Skill scale | `hover:scale-105 transition-transform` or `.skill-card` |
| Link underline | `hover:text-primary transition-colors` |
| Button press | `active:scale-95 transition-transform` |

### Layout Animation (Active Nav)
```tsx
// Spring transition for active indicator
<motion.div
  layoutId="activeSection"
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

### Reduced Motion (Accessibility)
```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion"

const prefersReduced = useReducedMotion()
// Disable or minimize animations when true
animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
```

### Motion Rules
- **Never** animate `height`, `width`, `top`, `left`, `margin`, `padding` — these trigger layout reflow.
- **Always** animate `transform` (`translateX`, `translateY`, `scale`, `rotate`) and `opacity` only.
- **Respect** `prefers-reduced-motion` — use `useReducedMotion` hook in components with significant animation.
- **No animation on every scroll event** — debounce or use Intersection Observer instead.

---

## Component Visual Patterns

### Custom CSS Classes (in `globals.css`)
| Class | Visual Effect | When to Use |
|---|---|---|
| `.gradient-text` | Rose→transparent gradient text | Hero name, key labels |
| `.timeline-item` | Left-dot timeline with hover `translateX(5px)` | Experience, Education entries |
| `.project-card` | `hover:-translate-y-1 hover:shadow-lg` | Project showcase cards |
| `.skill-card` | `hover:scale-105 hover:shadow-lg` | Skill badges/chips |
| `.section-eyebrow` | Tokenized pill label with uppercase mono rhythm | Section labels and editorial metadata |
| `.agency-surface` | Tokenized glass/elevated surface using OKLCH color mixing | Premium panels, forms, and featured case-study cards |
| `.editorial-grid` | Subtle token-based background grid with radial mask | Hero and project atmosphere |
| `.grain-overlay` | Layered token-based radial texture | Section atmosphere and visual depth |
| `.metric-tile` | Compact bordered stat tile | Hero stats and compact facts |

### Premium Agency Surface
```tsx
// Use for featured panels, contact forms, and editorial case-study cards
className="agency-surface rounded-lg p-5 md:p-6"
```

### Glassmorphism (Dark Mode Cards)
```tsx
// Use for floating panels, hover states in dark mode
className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg"
```

### Section Structure Template
```tsx
<section id="section-name" className="py-20 md:py-32">
  <div className="container px-4 md:px-6 mx-auto">
    {/* Section heading */}
    <h2 className="text-4xl font-bold mb-12 text-center">
      <span className="gradient-text">Section Title</span>
    </h2>
    {/* Content */}
  </div>
</section>
```

---

## Iconography

- **Library**: `lucide-react` — named imports only (tree-shaking friendly).
- **Size**: `h-4 w-4` (small), `h-5 w-5` (default), `h-6 w-6` (large).
- **Accessibility**: All icon-only usage must have `aria-hidden="true"` on the icon + `<span className="sr-only">` label.
- **Never** import default from lucide: `import { Github } from "lucide-react"` ✅

---

## Background & Atmosphere

The `AnimatedBackground` component creates atmospheric depth. Guidelines:
- Keep background effects **subtle and performant** — CSS-native where possible.
- Use `pointer-events-none` so background never intercepts interactions.
- `z-index` must always be below content (`z-0` or lower).
- Do not add heavy canvas/WebGL effects that impact LCP or INP.
