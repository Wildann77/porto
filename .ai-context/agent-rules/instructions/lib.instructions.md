---
applyTo: "lib/**/*.ts"
---

# Layer Rules: `lib/` (Utility Functions)

## Purpose
The `lib/` directory contains **pure utility functions and shared type definitions**. These functions have no side effects and no dependencies on React, Next.js internals, or portfolio-specific logic.

## Current Utilities

| File | Export | Description |
|---|---|---|
| `utils.ts` | `cn(...inputs)` | Merges Tailwind classes using `clsx` + `tailwind-merge` |

## Allowed
- Pure functions (no side effects)
- Type definitions and TypeScript interfaces
- Constants and configuration objects (non-sensitive)
- Imports from `clsx`, `tailwind-merge`, or other pure utility libraries

## Forbidden
- React component imports or JSX
- Imports from `components/` or `app/`
- DOM manipulation or browser APIs
- `fetch()` calls or async operations that involve external services
- Hardcoded secrets, API keys, or URLs

## The `cn()` Utility

This is the **only** approved method for dynamic class merging. Always use it instead of template literals or manual concatenation:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```tsx
import { cn } from "@/lib/utils"

// ✅ Correct
<div className={cn("base", isActive && "text-primary", variant === "ghost" && "bg-transparent")}>

// ❌ Wrong
<div className={`base ${isActive ? "text-primary" : ""}`}>
```

## Adding New Utilities

If you need a new helper function:
1. Check if the logic can go in `lib/utils.ts` (preferred for small functions).
2. For larger utilities, create a new descriptively-named file: `lib/animations.ts`, `lib/constants.ts`, etc.
3. Keep functions pure and testable.
4. Export named functions (not default exports from `lib/`).
