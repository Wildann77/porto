---
applyTo: "app/**/*.tsx"
---

# Layer Rules: `app/` (Next.js App Router)

## Purpose
The `app/` directory is the Next.js App Router layer. It is responsible for **page composition**, **routing**, and **SEO metadata** only. Components in this layer are **Server Components by default**.

## Allowed
- `export const metadata: Metadata` — defining SEO metadata per page/layout
- Importing and composing section components from `components/`
- Defining route segments (`page.tsx`, `layout.tsx`, `not-found.tsx`)
- Using `Suspense` for streaming UI
- Server-side data fetching (when needed in future)

## Forbidden
- `"use client"` directive on `app/layout.tsx` or `app/pSage.tsx` — delegate to client components instead
- `useState`, `useEffect`, or any React hooks
- Event handlers (`onClick`, `onChange`, etc.)
- Direct styling or UI logic that belongs in `components/`
- Business logic or data transformation

## Special Files

| File | Purpose |
|---|---|
| `layout.tsx` | Root layout with metadata, Analytics, theme-portal div |
| `client.tsx` | Client boundary — wraps ThemeProvider, Header, Footer, AnimatedBackground |
| `page.tsx` | Home page — compose section components here |
| `globals.css` | Design tokens (OKLCH CSS variables) + global styles |
| `not-found.tsx` | 404 error page |

## Key Invariants

1. `app/layout.tsx` must remain a **Server Component** — all client logic lives in `app/client.tsx`.
2. The `<div id="theme-portal">` in `layout.tsx` must not be removed — it's used as a portal mount for dropdowns.
3. `globals.css` is the **single source of truth** for all CSS custom properties. Do not define design tokens elsewhere.

## Metadata Pattern

```tsx
export const metadata: Metadata = {
  title: "Wildan Haifan Jadid | Full Stack Software Engineer",
  description: "...",
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true },
}
```
