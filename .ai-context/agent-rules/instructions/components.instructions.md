---
applyTo: "components/*.tsx"
---

# Layer Rules: `components/` (Section & Layout Components)

## Purpose
The `components/` directory contains all **portfolio section components** and **layout components**. These are the building blocks of the portfolio UI. Each file typically represents one portfolio section or one reusable layout element.

## Component Inventory

### Section Components (Portfolio Content)
| File | Section ID | Description |
|---|---|---|
| `hero.tsx` | `#home` | Landing hero with CTA buttons and social links |
| `about.tsx` | `#about` | Bio and personal introduction |
| `experience.tsx` | `#experience` | Work experience timeline |
| `projects.tsx` | `#projects` | Featured project cards |
| `education.tsx` | `#education` | Education history |
| `contact.tsx` | `#contact` | Contact form |
| `blog.tsx` | `#blog` | Blog section (commented out) |
| `open-source.tsx` | `#open-source` | Open source contributions |
| `skills.tsx` / `skills-content.tsx` / `skills-visualization.tsx` | `#skills` | Skills display |

### Layout Components
| File | Description |
|---|---|
| `header.tsx` | Fixed navigation bar with active section tracking |
| `footer.tsx` | Page footer |
| `animated-background.tsx` | Decorative background animation |
| `theme-provider.tsx` | Wraps `next-themes` ThemeProvider |
| `mode-toggle.tsx` | Light/dark mode switcher with portal dropdown |
| `analytics.tsx` | Vercel Analytics wrapper |
| `speed-insights.tsx` | Vercel Speed Insights wrapper |
| `noscript-styles.tsx` | Fallback styles for no-JS environments |

## Allowed
- `"use client"` when the component needs hooks or event handlers
- `framer-motion` for animations (always with `"use client"`)
- `lucide-react` icons
- Composing `components/ui/*` primitives
- Using `cn()` from `lib/utils`
- Using Tailwind classes with design tokens only
- Custom CSS classes defined in `globals.css` (`gradient-text`, `timeline-item`, `project-card`, `skill-card`)

## Forbidden
- Importing from other section-level components (e.g., `Hero` importing from `Contact`)
- Raw hex/RGB colors in `className` or `style` props
- `fetch()` calls to external APIs
- Global state management (no Zustand, Redux, etc.)
- `<img>` tags — use `next/image` instead
- Modifying or removing `id` attributes on `<section>` elements

## Key Invariants

### Section ID Rule
Every section component **must** have `id="<section-name>"` matching its nav href:
```tsx
// ✅ Correct
<section id="projects" className="py-20">

// ❌ Wrong — this breaks scroll navigation
<section className="py-20">
```

### Active Section Tracking
The `Header` component uses `document.getElementById()` to track active sections. If you rename a section ID, you **must** also update:
1. The `navItems` array in `header.tsx`
2. The `allSections` override logic in `determineActiveSection()`

### Animation Pattern
```tsx
"use client"
import { motion } from "framer-motion"

// Entry animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>

// Layout animation (for active states)
<motion.div layoutId="uniqueId" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
```

### Gradient Text Pattern
```tsx
// Use the pre-defined CSS class, not inline styles
<span className="gradient-text">Your Name</span>
```

### Card Hover Pattern
```tsx
// Use pre-defined utility classes from globals.css
<div className="project-card"> // hover:-translate-y-1 hover:shadow-lg
<div className="skill-card">   // hover:scale-105 hover:shadow-lg
```
