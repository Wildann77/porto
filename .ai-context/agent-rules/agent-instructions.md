# Agent Instructions — Wildan Portfolio

> Panduan kerja lengkap untuk AI agent yang bekerja di repo ini.
> Selalu baca `AGENTS.md` sebagai kontrak utama, file ini berisi panduan operasional.

---

## Active Skills (Read First)

Sebelum mengerjakan task apapun, agent WAJIB memahami dua skill aktif:

| Skill | Path | Kapan Relevan |
|---|---|---|
| `senior-frontend` | `.agents/skills/senior-frontend/SKILL.md` | Semua task yang menyentuh performa, arsitektur, TypeScript, aksesibilitas |
| `frontend-design` | `.agents/skills/frontend-design/SKILL.md` | Semua task UI — komponen baru, layout, animasi, warna |

**Performance Profile**: `next-app-router` — target LCP ≤ 2000ms, INP ≤ 150ms, bundle ≤ 150KB gzip/route.

---

## Repository Summary

Portfolio pribadi Next.js 15 + React 19. **Frontend-only** — tidak ada backend, database, atau API routes saat ini. Layer:

```
app/          → RSC by default, metadata, page composition
components/   → Section & layout components
components/ui/→ Generic UI primitives (shadcn-style)
hooks/        → Custom React hooks (to be created)
lib/          → Pure utility functions
types/        → TypeScript interfaces (to be created)
```

---

## Layer Identification Decision Tree

```
Apakah ini perubahan route/SEO metadata?
  → app/page.tsx atau app/layout.tsx

Apakah ini section portfolio baru atau layout?
  → components/new-section.tsx

Apakah ini elemen UI generik reusable (button, card, input)?
  → components/ui/

Apakah ini logika stateful reusable tanpa JSX?
  → hooks/useHookName.ts

Apakah ini fungsi pure atau konstanta?
  → lib/utils.ts atau lib/constants.ts

Apakah ini TypeScript interface/type shared?
  → types/
```

---

## Working Style

### Sebelum Memulai Task
1. Baca section AGENTS.md yang relevan dengan layer yang akan dimodifikasi.
2. Cek komponen existing untuk pola yang sudah ada sebelum membuat yang baru.
3. Verifikasi dependency yang dibutuhkan sudah ada di `package.json`.
4. Untuk task UI: baca `.ai-context/docs/design-system.md` terlebih dahulu.
5. Untuk task performa: cek profile `next-app-router.json`.

### Saat Mengerjakan
- Selalu gunakan `cn()` dari `lib/utils.ts` untuk class merging.
- Selalu referensikan CSS custom properties dari `globals.css` untuk warna.
- Ketika menambah animasi, ikuti Motion System dari `design-system.md`.
- Ketika menambah section baru, daftarkan `id`-nya di nav `header.tsx` jika navigable.
- Gunakan `useInView` hook (setelah dibuat) untuk scroll-triggered animations.
- Gunakan `useReducedMotion` untuk accessibility pada komponen dengan animasi berat.

### Client vs Server Component
| Kondisi | Keputusan |
|---|---|
| Punya `useState`, `useEffect`, event handlers | `"use client"` wajib |
| Ada `onClick`, `onChange`, interaksi user | `"use client"` wajib |
| Menggunakan `framer-motion` | `"use client"` wajib |
| Konten statis saja | Server Component (tanpa directive) |
| Menggunakan `next/navigation` hooks | `"use client"` wajib |
| `app/layout.tsx` atau `app/page.tsx` | **TIDAK BOLEH** `"use client"` |

---

## Mandatory Self-Check Before Completing Any Task

Jalankan checklist ini sebelum task dianggap selesai:

```
TYPESCRIPT & LINT
[ ] npx tsc --noEmit — zero TypeScript errors?
[ ] npm run lint — zero ESLint warnings/errors?
[ ] npm run build — succeeds with 0 errors?

ARCHITECTURE
[ ] "use client" tidak ada di app/layout.tsx atau app/page.tsx?
[ ] RSC/Client boundary sudah benar?
[ ] Semua warna pakai CSS variables, bukan raw hex?

DESIGN & UX (dari frontend-design skill)
[ ] Apakah desain terasa intentional dan tidak generic?
[ ] Apakah typography menggunakan Mona Sans / Fira Code?
[ ] Apakah animasi menggunakan framer-motion (bukan @keyframes CSS)?
[ ] Apakah hover states sudah diimplementasikan?

PERFORMANCE (dari senior-frontend profile)
[ ] Semua gambar menggunakan next/image?
[ ] Komponen berat di-lazy-load dengan dynamic()?
[ ] Framer Motion hanya animate transform + opacity?

RESPONSIVE & THEME
[ ] Bekerja di LIGHT mode?
[ ] Bekerja di DARK mode?
[ ] Tampil benar di mobile (375px)?
[ ] Tampil benar di tablet (768px)?

ACCESSIBILITY (WCAG AA dari senior-frontend skill)
[ ] Icon-only buttons punya aria-label?
[ ] Form inputs punya label dan error handling?
[ ] Keyboard navigation berfungsi?
[ ] Focus indicators terlihat (focus-visible:ring-2)?
[ ] Tidak ada perubahan section ID yang merusak navigasi?
```

---

## Established Patterns to Follow

### Section Component Baru
```tsx
// components/new-section.tsx
"use client" // hanya jika interactive

import { useInView } from "@/hooks/useInView"  // setelah hooks dibuat
import { motion } from "framer-motion"

export default function NewSection() {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })

  return (
    <section id="new-section" className="py-20 md:py-32" ref={ref}>
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="gradient-text">Section Title</span>
        </motion.h2>
        {/* content */}
      </div>
    </section>
  )
}
```

### Design Token Usage
```tsx
// ✅ Benar — pakai token
className="text-primary bg-background border-border"
className="text-muted-foreground hover:text-foreground"

// ❌ Salah — raw value
style={{ color: '#e0657a' }}
className="text-[#e0657a]"
```

### Staggered Animation Pattern
```tsx
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### Form dengan Error State
```tsx
<form onSubmit={handleSubmit}>
  <label htmlFor="email" className="text-sm font-medium">Email</label>
  <Input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="text-destructive text-sm mt-1">
      {errors.email}
    </p>
  )}
</form>
```

---

## Anti-Patterns — Jangan Pernah Lakukan

```
❌ import styles from './Component.module.css'  — gunakan Tailwind
❌ style={{ color: '#xxx' }}  untuk warna statis
❌ "use client" pada app/layout.tsx atau app/page.tsx
❌ Import section component ke section lain
❌ <img> langsung — gunakan next/image
❌ Ubah id pada <section> existing tanpa update header.tsx
❌ Animasi pada height/width/margin/padding (picu layout reflow)
❌ Font: Inter, Roboto, Arial, Space Grotesk — DILARANG
❌ Desain purple gradient on white — DILARANG
❌ Import lucide-react sebagai default: import Icon from 'lucide-react'
❌ Buat file .md tanpa izin user
```
