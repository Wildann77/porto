---
applyTo: "components/ui/**/*.tsx"
---

# Layer Rules: `components/ui/` (UI Primitives)

## Purpose
The `components/ui/` directory contains **generic, reusable UI primitives** following a shadcn/ui-inspired pattern. These components have **no portfolio-specific knowledge** — they are domain-agnostic building blocks.

## Current UI Primitives

| Component | File | Description |
|---|---|---|
| `Button` | `button.tsx` | Multi-variant button using `cva` |
| `Card`, `CardHeader`, `CardContent`, `CardFooter` | `card.tsx` | Card layout primitives |
| `Badge` | `badge.tsx` | Status/tag badges |
| `Input` | `input.tsx` | Text input field |
| `Textarea` | `textarea.tsx` | Multi-line text input |
| `DropdownMenu` | `dropdown-menu.tsx` | Radix UI-based dropdown menu |

## Allowed
- `class-variance-authority` (`cva`) for variant definitions
- `cn()` from `lib/utils` for class merging
- Radix UI primitives (`@radix-ui/react-slot`, `@radix-ui/react-dropdown-menu`)
- Tailwind CSS utilities with design tokens
- `React.forwardRef` for DOM element exposure
- `React.HTMLAttributes` / `React.ComponentPropsWithoutRef` for prop types

## Forbidden
- Portfolio-specific content or business logic
- `framer-motion` — animations belong in consuming components
- Direct `fetch()` calls or data fetching
- State management beyond local UI state
- Importing from `components/` section-level components
- Hardcoded text content (labels must come from props)

## Variant Pattern with CVA

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

## Key Invariants

1. **No portfolio-specific props** — if you need to pass content, use standard HTML props or generic `children`.
2. **All colors must reference design tokens** — `bg-primary`, `text-foreground`, `border-border`, etc.
3. **`asChild` pattern** — use `@radix-ui/react-slot` Slot for polymorphic rendering when needed.
4. **Accessible by default** — primitives must work with keyboard navigation and screen readers.
