# Slice of Heaven — Frontend Design System Documentation
**Single Source of Truth for UI/UX, Design Tokens, and Component Architecture**

---

## 1. Design Philosophy

> **Concept:** *Modern Bakery × Premium Editorial × Minimal Luxury*

Slice of Heaven is designed as an artisanal patisserie and luxury cake brand digital experience. The design avoids childish, neon, or overly saturated aesthetics, instead establishing an editorial, warm, and appetizing identity through:
- **Warm, soothing tones** (creamy alabaster backgrounds, rich cocoa typography, warm terracotta accents, and soft honeycomb gold).
- **Strong typography hierarchy** pairing a display serif for headlines with a geometric sans-serif for UI elements.
- **Generous whitespace and systematic spacing** to let imagery and products breathe.
- **Subtle elevation and soft borders** rather than harsh black drop-shadows or stark borders.
- **Micro-animations and responsive touch points** designed for high engagement across all devices.

---

## 2. Color System

All colors are mapped to CSS variables in `src/index.css`.

| Token | Variable | HEX | Purpose / Usage |
|---|---|---|---|
| **Background Primary** | `--color-bg-primary` | `#FAF7F2` | Main page background (Warm Cream / Alabaster) |
| **Background Secondary** | `--color-bg-secondary` | `#F3ECE2` | Section cards, story banners, footers |
| **Background Tertiary** | `--color-bg-tertiary` | `#EBE1D4` | Muted biscuit dividers & subtle panels |
| **Card Surface** | `--color-bg-card` | `#FFFFFF` | Crisp white cards, inputs, dropdowns |
| **Brand Primary** | `--color-brand-primary` | `#2C1A14` | Deep Espresso Cocoa (Headings, primary text, dark CTA) |
| **Brand Primary Light** | `--color-brand-primary-light` | `#442B23` | Hover state for dark buttons & footers |
| **Brand Secondary** | `--color-brand-secondary` | `#C87D55` | Warm Caramel / Terracotta (Primary CTA, badges, active tabs) |
| **Brand Secondary Hover** | `--color-brand-secondary-hover` | `#B56C44` | Hover state for caramel buttons |
| **Brand Secondary Light**| `--color-brand-secondary-light` | `#FBF0E9` | Soft caramel tint for icon boxes & pill backgrounds |
| **Accent Gold** | `--color-accent-gold` | `#D4A373` | Honeycomb Gold (Eyebrow labels, badges, stars, highlights) |
| **Accent Gold Light** | `--color-accent-gold-light` | `#FAF3EB` | Gold badge background |
| **Text Primary** | `--color-text-primary` | `#2A201A` | Main body & title text (rich charcoal-brown) |
| **Text Secondary** | `--color-text-secondary` | `#685950` | Muted brown-gray for descriptions and sub-labels |
| **Text Muted** | `--color-text-muted` | `#9B8D84` | Hints, placeholders, timestamps |
| **Border Subtle** | `--color-border-subtle` | `#E8DFD5` | Card borders, horizontal rules, dividers |
| **Border Medium** | `--color-border-medium` | `#D8CCC0` | Form input borders, hover frames |
| **Success** | `--color-success` | `#3F7A54` | Sage/Forest green (Confirmed orders, in-stock badges) |
| **Success Background** | `--color-success-bg` | `#EDF7F1` | Success alerts & added-to-cart badges |
| **Warning** | `--color-warning` | `#D97706` | Pending orders, alert notices |
| **Warning Background** | `--color-warning-bg` | `#FEF3C7` | Warning badge tint |
| **Error** | `--color-error` | `#C94A29` | Warm crimson (Validation errors, cancellations) |
| **Error Background** | `--color-error-bg` | `#FDF2F0` | Error alert boxes |

---

## 3. Typography System

### Font Families
- **Display / Heading Typeface:** `'Playfair Display', Georgia, serif`
- **Body / Interface Typeface:** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`

### Type Scale & Hierarchy

| Role | Font Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| **Display / Hero** | Playfair Display | `2.5rem – 3.8rem` | Bold (700) | `1.12` | `-0.02em` |
| **H1** | Playfair Display | `2.25rem – 3.0rem` | Bold (700) | `1.15` | `-0.015em` |
| **H2** | Playfair Display | `1.75rem – 2.35rem`| Semibold (600)| `1.2` | `-0.01em` |
| **H3** | Playfair Display | `1.25rem – 1.65rem`| Semibold (600)| `1.25`| `0` |
| **H4** | Plus Jakarta Sans | `1.1rem – 1.25rem` | Bold (700) | `1.35` | `0` |
| **Body Large / Lead**| Plus Jakarta Sans | `1.05rem (17px)` | Medium (500) | `1.65` | `0` |
| **Body Regular** | Plus Jakarta Sans | `0.9375rem – 1rem` | Regular (400) | `1.65` | `0` |
| **Body Small** | Plus Jakarta Sans | `0.875rem (14px)` | Regular (400) | `1.55` | `0` |
| **Caption / Meta** | Plus Jakarta Sans | `0.75rem – 0.8125rem` | Medium (500) | `1.4` | `0.02em` |
| **Eyebrow / Label**| Plus Jakarta Sans | `0.75rem – 0.8125rem` | Bold (700) | `1.2` | `0.12em (UPPER)` |

---

## 4. Spacing Scale (4px Base Grid)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

- **Section Vertical Padding:** `var(--space-16)` (desktop) / `var(--space-10)` (mobile)
- **Container Inset:** `var(--space-6)` (desktop) / `var(--space-4)` (mobile)

---

## 5. Layout & Grid Architecture

- **Global Max Width:** `1240px` (`.container`)
- **Narrow Form Width:** `840px` (`.container-narrow`)
- **Grid Systems:**
  - Product Catalog Grid: `repeat(4, 1fr)` on desktop, `repeat(3, 1fr)` at 1200px, `repeat(2, 1fr)` at 860px, `1fr` on mobile.
  - Category Showcase: `repeat(3, 1fr)` on desktop, `repeat(2, 1fr)` at 992px, `1fr` on mobile.
  - Value Props: `repeat(4, 1fr)` on desktop, `repeat(2, 1fr)` at 1024px, `1fr` on mobile.
  - Checkout & Product Details: `1.15fr 1fr` dual-column on desktop, stacking to `1fr` at 900px.

---

## 6. Border Radius

```css
--radius-xs: 4px;      /* Micro tags, status indicators */
--radius-sm: 8px;      /* Meta badges, image frames */
--radius-md: 14px;     /* Form inputs, select menus, small cards */
--radius-lg: 20px;     /* Product cards, value props, banners */
--radius-xl: 28px;     /* Modal containers, summary cards, story frames */
--radius-full: 9999px; /* Pill buttons, category filters, circular badges */
```

---

## 7. Shadows & Elevation Scale

```css
--shadow-xs: 0 1px 3px rgba(44, 26, 20, 0.04);
--shadow-sm: 0 4px 12px rgba(44, 26, 20, 0.06);
--shadow-md: 0 8px 24px rgba(44, 26, 20, 0.08);
--shadow-lg: 0 16px 36px rgba(44, 26, 20, 0.11);
--shadow-hover: 0 12px 28px rgba(200, 125, 85, 0.18);
```

---

## 8. Button System

| Class | Appearance | Purpose |
|---|---|---|
| `.btn-primary` | Terracotta/Caramel background (`#C87D55`), white text, soft warm glow | Primary action (Add to Bag, Place Order, Explore Menu) |
| `.btn-dark` | Deep Espresso background (`#2C1A14`), white text | High-contrast secondary or admin actions |
| `.btn-secondary`| Light caramel tint background (`#FBF0E9`), terracotta text | Alternate actions (Clear filters, item increment) |
| `.btn-outline` | Transparent with subtle border (`--color-border-strong`), dark text | Neutral actions (Browse treats, Back to Home) |
| `.btn-ghost` | Text-only with background hover transition | Clean links within tables or breadcrumbs |
| `.btn-sm` / `.btn-lg` | Standard sizing modifiers | Small chips vs prominent hero CTAs |

---

## 9. Card System

All cards adhere to:
- Crisp white surface background (`--color-bg-card`)
- Subtle border (`1px solid var(--color-border-subtle)`)
- Rounded corners (`--radius-lg` / `20px`)
- Smooth translation on hover (`transform: translateY(-5px)` + `--shadow-md`)
- Aspect-ratio locked image containers with `object-fit: cover` and subtle zoom on card hover.

---

## 10. Forms & Controls

- **Inputs / Textareas / Selects:**
  - Background: `#FFFFFF`
  - Border: `1.5px solid var(--color-border-subtle)`
  - Padding: `0.85rem 1.1rem`
  - Border Radius: `var(--radius-md)`
  - Focus State: Border color transitions to `--color-brand-secondary` with `box-shadow: 0 0 0 3px rgba(200, 125, 85, 0.15)`.

---

## 11. Responsive Design Rules

- **Mobile First Philosophy:** No horizontal scroll (`overflow-x: hidden`).
- **Touch Targets:** Buttons and interactive elements maintain minimum `42px` touch targets.
- **Mobile Navbar:** Collapses into a clean slide-out drawer navigation with search bar and direct category navigation.
- **Images:** All images utilize responsive containers with aspect-ratio preservation and fallback error handlers.

---

## 12. Accessibility (a11y)

- All color pairings exceed WCAG AA contrast ratio standards against backgrounds.
- Semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<figure>`, `<figcaption>`).
- Visible focus rings with `:focus-visible` styling (`outline: 2px solid var(--color-brand-secondary)`).
- Clear `aria-label` attributes on icon-only and mobile controls.
- Full respect for `prefers-reduced-motion`.

---

## 13. Component Guidelines & Usage

1. **Reusability:** Always use central design tokens (`var(--color-...)`, `var(--space-...)`, `var(--radius-...)`) instead of ad-hoc hex values.
2. **Buttons:** Use standard `.btn` utility classes rather than creating individual button rules in page CSS.
3. **Typography:** Use semantic headings `<h1>` to `<h4>` and apply `.eyebrow` for decorative section labels.

---

## 14. Do & Don't Rules

### ✅ Do
- Use CSS variables from `src/index.css`.
- Use the warm cream and deep cocoa brand palette.
- Keep generous padding and whitespace.
- Preserve backend API request/response structures, routes, and data flows.
- Use `Playfair Display` for headers and `Plus Jakarta Sans` for UI copy.

### ❌ Don't
- Hardcode neon, purple, or saturated primary colors.
- Use raw, un-curated box shadows.
- Change backend routes, endpoints, or state management logic.
- Introduce arbitrary pixel values for padding or margins outside the 4px scale.
