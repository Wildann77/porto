# Domain Rules — Wildan Portfolio

## Owner Information

| Field | Value |
|---|---|
| Name | Wildan Haifan Jadid |
| Title | Full Stack Software Engineer |
| Location | Brebes, Indonesia |
| GitHub | [Wildann77](https://github.com/Wildann77) |
| LinkedIn | [wildan-haifan-jadid](https://www.linkedin.com/in/wildan-haifan-jadid-1820222a8/) |
| Email | boyblanco77@gmail.com |

> **Agent rule**: Personal information like name, social links, and contact details should only be modified in their designated component files (`hero.tsx`, `contact.tsx`, `footer.tsx`). Do not scatter personal data across multiple files.

---

## Portfolio Sections (Domain Entities)

### Section Definition

Each section is a **self-contained domain entity** with:
- A unique `id` attribute (used for scroll navigation)
- A dedicated component file in `components/`
- Its own content data (currently hardcoded, may be data-driven in future)

### Section Registry

| Section ID | Component File | Nav Label | Status |
|---|---|---|---|
| `home` | `hero.tsx` | "Home" | ✅ Active |
| `about` | `about.tsx` | "About" | ✅ Active |
| `experience` | `experience.tsx` | "Experience" | ✅ Active |
| `skills` | `skills.tsx` | — (sub-section of experience) | ✅ Active |
| `projects` | `projects.tsx` | "Projects" | ✅ Active |
| `open-source` | `open-source.tsx` | — (sub-section of projects) | ✅ Active |
| `education` | `education.tsx` | "Education" | ✅ Active |
| `contact` | `contact.tsx` | "Contact Me" | ✅ Active |

### Sub-Section Mapping (Active Section Override)

The header's `determineActiveSection()` function maps sub-sections to their parent nav item:

| Sub-Section ID | Maps to Nav Item |
|---|---|
| `open-source` | `projects` |
| `skills` | `experience` |

> **Agent rule**: If you add a new section that should be part of an existing nav item, add the mapping to `determineActiveSection()` in `header.tsx`.

---

## Content Rules

### Hero Section (`hero.tsx`)
- Must contain a single `<h1>` with the owner's full name.
- Social links: GitHub, LinkedIn, Email — always present.
- CTA buttons: "Get In Touch" (→ `#contact`) and "Download Resume" (external link).
- The resume download URL can be empty but the button must remain.

### Experience Section (`experience.tsx`)
- Uses `.timeline-item` CSS class for visual timeline styling.
- Each entry should have: company, role, date range, and description.
- Most recent experience first (reverse chronological).

### Projects Section (`projects.tsx`)
- Each project card uses `.project-card` CSS class.
- Required fields per project: title, description, tech stack badges, and at least one link (GitHub or live demo).
- Tech stack displayed as `<Badge>` components.

### Contact Section (`contact.tsx`)
- Contains a contact form (name, email, message fields).
- Form uses `<Input>` and `<Textarea>` from `components/ui/`.
- Currently no backend — form submission behavior TBD.

---

## Navigation Rules

### Nav Item Definition
```ts
// In components/header.tsx
const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact Me", href: "#contact" },
]
```

### Scroll Behavior
- Smooth scroll offset: `element.offsetTop - 80` (accounts for 64px fixed header + buffer).
- Active section detected by checking if section's `getBoundingClientRect().top <= 150`.
- Scroll event listener added/removed in `useEffect` with proper cleanup.

---

## Naming Conventions

### Components
```
PascalCase for component names:     ModeToggle, AnimatedBackground
kebab-case for file names:          mode-toggle.tsx, animated-background.tsx
```

### CSS
```
kebab-case for custom classes:      .gradient-text, .timeline-item, .project-card
camelCase for CSS JS interop:       fontSans.variable
```

### IDs & Anchors
```
kebab-case for section IDs:         id="open-source", id="contact"
Hash-prefixed in nav hrefs:         href="#open-source", href="#contact"
```

### TypeScript
```
PascalCase for types/interfaces:    type ButtonProps, interface NavItem
camelCase for variables/functions:  const navItems, function cn()
SCREAMING_SNAKE_CASE for constants: (not yet used, adopt if needed)
```

---

## API / Data Conventions

This project currently has **no API routes**. All data is hardcoded within component files.

### Future API Consideration
If a contact form API or CMS is added:
- Create `app/api/` routes using Next.js Route Handlers.
- Use environment variables for API keys/endpoints.
- Return consistent response format: `{ success: boolean, message: string, data?: unknown }`.

---

## Accessibility Requirements

| Requirement | Implementation |
|---|---|
| Icon-only buttons | Must have `<span className="sr-only">Label</span>` |
| Navigation | Use semantic `<nav>`, `<header>`, `<main>` elements |
| Images | `alt` attribute required on all `next/image` instances |
| Interactive elements | Keyboard navigable, visible focus states |
| Color contrast | OKLCH tokens designed for WCAG AA compliance |
