---
applyTo: "hooks/**/*.ts"
---

# Layer Rules: `hooks/` (Custom React Hooks)

## Purpose
The `hooks/` directory contains **reusable custom React hooks** that encapsulate stateful logic and browser API abstractions. Hooks in this layer are consumed by client components in `components/`. They must never render JSX.

## Planned Hooks (PRD Sprint 1–2)

| Hook | File | Purpose |
|---|---|---|
| `useInView` | `useInView.ts` | Intersection Observer wrapper — trigger section animations on viewport entry |
| `useScrollProgress` | `useScrollProgress.ts` | Track document scroll percentage (for future progress bar) |
| `useSectionObserver` | `useSectionObserver.ts` | Replaces scroll-based `determineActiveSection` in `header.tsx` with IO-based approach |
| `useFormState` | `useFormState.ts` | Contact form state (loading, success, error) |
| `useMediaQuery` | `useMediaQuery.ts` | Responsive breakpoint detection |
| `useReducedMotion` | `useReducedMotion.ts` | Respects `prefers-reduced-motion` for accessibility |

## Allowed
- `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `useReducer`
- Browser API abstraction (Intersection Observer, ResizeObserver, matchMedia)
- Return values only (primitive, object, array, tuple)
- Event listener setup with proper cleanup in `useEffect` return

## Forbidden
- JSX / component rendering
- Direct `fetch()` calls to external APIs
- Side effects without cleanup (memory leaks)
- Mutating global state
- Importing from `components/` or `app/`

## Hook Patterns

### Intersection Observer Pattern (for scroll-triggered animations)
```ts
// hooks/useInView.ts
"use client" // hooks that use browser APIs need this only in some tool configs
import { useEffect, useRef, useState, useCallback } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView({ threshold = 0.1, rootMargin = "0px", once = true }: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isInView }
}
```

### Reduced Motion Pattern (Accessibility)
```ts
// hooks/useReducedMotion.ts
import { useEffect, useState } from "react"

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return prefersReduced
}
```

### Usage in Components
```tsx
// components/experience.tsx
"use client"
import { useInView } from "@/hooks/useInView"
import { motion } from "framer-motion"

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })

  return (
    <section ref={ref} id="experience">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {/* content */}
      </motion.div>
    </section>
  )
}
```

## Key Invariants

1. **Always clean up** — Every `useEffect` that adds an event listener or creates an observer MUST return a cleanup function.
2. **No JSX** — Hooks return data/functions, never JSX elements.
3. **SSR-safe** — Guard browser APIs behind `useEffect` or `typeof window !== "undefined"` checks.
4. **Single responsibility** — One concern per hook. Don't combine scroll + form logic into one hook.
