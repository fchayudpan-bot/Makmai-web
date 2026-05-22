---
name: makmai-design
description: Use this skill to generate well-branded interfaces and assets for Makmai (หมากไม้) — a Thai cold-pressed juice and healthy-food e-commerce brand rooted in Isan hospitality. Use for production UI, throwaway prototypes, marketing slides, or any visual artifact that needs to feel on-brand. Contains essential design guidelines, colors (forest #006030 / bark #603000), bilingual Thai+English typography, the brand logo, and a React UI kit for the e-commerce experience.
user-invocable: true
---

# Makmai Design Skill

Makmai (หมากไม้, "fruit" in Isan dialect) is a Thai cold-pressed juice and healthy-meal e-commerce brand with two branches (Kalasin and Khon Kaen). The brand is bilingual (Thai primary, English secondary), targeted at urban professionals aged 23–45.

## How to use this skill

1. **Read `README.md`** first — it contains the full brand context, voice, content rules, visual foundations, and an index of every other file.
2. **Read `colors_and_type.css`** to get the design tokens. For Tailwind projects, copy from `tailwind.config.js`.
3. **Browse `preview/`** for visual examples of each token, type style, and component.
4. **Browse `ui_kits/web/`** for full screen recreations of the e-commerce experience and the React components (cards, buttons, branch selector, cart, checkout).
5. **Copy assets out of `assets/`** rather than referencing across projects — the Makmai logo lives there.

## When creating visual artifacts (slides, mocks, throwaway prototypes)
Copy the relevant assets and CSS into the new project, then build static HTML files. Use the type pair (Bai Jamjuree + IBM Plex Sans Thai Looped) via the Google Fonts `@import` already in `colors_and_type.css`.

## When working on production code
Use `tailwind.config.js` directly. The token names (forest, bark, citrus, berry, cream, sand, ink, night) are the contract — refer to colors by token, not hex.

## Brand-critical rules — do not break
- The brand name is always **"หมากไม้ Makmai"** or **"Makmai"** — never "Fruit," never just "MM."
- **Thai text leads** on customer-facing surfaces. English is secondary.
- Page background is **cream `#FDFAF2`**, not white. Don't ship a pure-white surface.
- Forest green (`#006030`) and bark brown (`#603000`) come **directly from the logo** — they're non-negotiable.
- No emoji in hero copy. Sparingly in confirmations.
- No bouncy springs, no purple gradients, no colored left-border cards, no AI-slop botanical SVGs.
- Use Lucide icons (1.5px stroke). Don't mix icon sets.

## If invoked without a clear task
Ask the user what they want to build (a landing page section? a product card? a marketing slide? a full screen?), ask 2–3 focused questions about scope and audience, then act as an expert designer and produce HTML artifacts or production code.
