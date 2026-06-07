# Operations — Wildan Portfolio

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev
# or with bun (faster)
bun dev

# Build production bundle
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint
```

> **Default dev server**: `http://localhost:3000`
> **Package manager**: Both `bun` and `npm` are supported. Prefer `bun` for speed.

---

## Environment Variables

This project currently requires **no environment variables**. The `.env.local` file is not needed for development.

### If You Add Environment Variables in Future

1. Create `.env.local` at project root (already in `.gitignore` ✅).
2. Document all keys in `.env.example`:

```bash
# .env.example
# Contact form API (if added)
# NEXT_PUBLIC_CONTACT_API_URL=https://your-api.com/contact

# Email service (if added)
# RESEND_API_KEY=your_key_here
```

3. Access in Next.js:
   - `NEXT_PUBLIC_*` — accessible in browser (public)
   - Other variables — server-side only

---

## Deployment

### Platform: Vercel (Recommended)

This project is configured for Vercel deployment:

1. Connect GitHub repo to Vercel project.
2. Vercel auto-detects Next.js and sets build command to `next build`.
3. Analytics and Speed Insights are already integrated via `@vercel/analytics`.

### Vercel Configuration
No `vercel.json` is needed — Next.js is auto-detected.

### Build Check Before Deploy
```bash
npm run build  # must pass with 0 errors
npm run lint   # must pass with 0 errors/warnings
```

---

## Analytics & Monitoring

### Vercel Analytics
- Component: `components/analytics.tsx`
- Mounted in: `app/layout.tsx` (always active, no configuration needed)
- Tracks: page views, Web Vitals
- Dashboard: Vercel project settings → Analytics tab

### Vercel Speed Insights
- Component: `components/speed-insights.tsx`
- Available but **not currently mounted** in `app/layout.tsx`
- To enable: import `<SpeedInsights />` in `app/layout.tsx`

---

## Security

### Current Security Posture
- No user authentication required (public portfolio).
- No sensitive data processed server-side.
- No API keys in use.

### `.gitignore` (Verify These Are Listed)
```
.env.local
.env.*.local
node_modules/
.next/
```

### Content Security
- External links use `target="_blank" rel="noopener noreferrer"` ✅
- No `dangerouslySetInnerHTML` usage ✅
- No eval() or dynamic code execution ✅

---

## Performance Optimization

### Current Optimizations
| Optimization | Implementation |
|---|---|
| Font optimization | `next/font/google` (Mona Sans) — zero layout shift |
| Client boundary | `app/client.tsx` separates server/client concerns |
| Streaming | `Suspense` wraps `ClientLayout` in `app/layout.tsx` |
| Backdrop blur | CSS-native `backdrop-blur-lg` (GPU accelerated) |
| Animation | `framer-motion` with hardware-accelerated transforms |

### Performance Checklist
- [ ] Images use `next/image` with explicit `width` and `height`
- [ ] Heavy components loaded with `dynamic()` import if needed
- [ ] `framer-motion` animations use `transform` and `opacity` only (no layout-triggering props)
- [ ] No blocking resources in `<head>`

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full (OKLCH supported in Safari 15.4+) |
| Edge | ✅ Full |
| IE11 | ❌ Not supported |

### No-JS Fallback
- `components/noscript-styles.tsx` provides basic layout styles when JavaScript is disabled.
- A banner is shown in `app/client.tsx` via `<noscript>` when JS is disabled.
- Hero section has noscript fallback text for the type animation.

---

## Theming

### Theme Modes
| Mode | Default | CSS Class |
|---|---|---|
| Light | ✅ Yes | `:root` |
| Dark | No | `.dark` |

### Theme Toggle
- Component: `components/mode-toggle.tsx`
- Uses `next-themes` `useTheme()` hook.
- Renders via a portal to `#theme-portal` div (avoids z-index issues inside nav).
- No system preference detection (`enableSystem={false}` in ThemeProvider).

### Testing Theme Changes
When adding new UI elements, always verify:
1. Light mode appearance (default)
2. Dark mode appearance (click theme toggle)
3. Check CSS variables used are defined in both `:root` and `.dark` blocks in `globals.css`
