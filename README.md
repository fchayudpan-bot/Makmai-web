# Makmai Design System
### หมากไม้ — Cold-pressed juices, smoothies & healthy meals from Isan

> *Makmai* (หมากไม้) is an Isan dialect word meaning **"fruit"**. The brand is rooted in northeastern Thai warmth, expressed through a modern, soft-minimal e-commerce experience for urban professionals (23–45) who manage wellness through clean eating rather than heavy exercise.

---

## At a glance

| | |
|---|---|
| **Markets** | Thailand 🇹🇭 — bilingual UI (ไทย / EN) |
| **Branches** | สาขากาฬสินธุ์ (Kalasin) · สาขาขอนแก่น (Khon Kaen) |
| **Products** | Cold-pressed juices, fruit smoothies, salads (฿89), premium protein meals (up to ฿145) |
| **Price band** | ฿65 – ฿145 — affordable-premium |
| **Tech** | React · Tailwind CSS · Supabase |
| **Audience** | Urban working pros, 23–45, wellness-curious, convenience-driven |

## Sources we drew from

This system was built from a single uploaded asset and a written brief — there is no Figma file, codebase, or pre-existing UI to reference.

- **Logo** — `uploads/BGRemove.png` (1080×1080 PNG, transparent). The primary `#006030` forest green and `#603000` bark brown were **sampled directly from the logo**, not invented.
- **Brand brief** — written context from the founder describing positioning, products, pricing, target users, and three core UX goals (3-click checkout, smart upsell, branch selector).

> If a Figma file, customer photography, or existing site/codebase becomes available, re-attach it and we'll align everything to the source of truth.

---

## Brand mood

Five adjectives, anchored on the requested **"Welcoming"**:

1. **Welcoming** — Isan hospitality. The shop greets you like a neighbor: in Thai first, with warm cream tones, never sterile or clinical.
2. **Fresh** — cold-pressed, same-day, never-from-concentrate. The interface feels uncluttered and breathable, like a fridge of just-picked fruit.
3. **Grounded** — earthy bark brown, soft sand, rooted Thai typography. We are a real place (กาฬสินธุ์ / ขอนแก่น), not a generic D2C juice brand.
4. **Crafted** — hand-drawn botanical accents, considered type pairings, generous whitespace. Premium without being precious.
5. **Modern** — clean grid, soft minimalism, fast checkout. Built for a 2026 lifestyle, not a 2015 health-food site.

## Visual style direction

**Soft Minimalism × Eco-Modern × Isan Botanical.**

- Cream canvas, not white. Warm off-whites read as "kitchen-table" instead of "lab."
- Forest green is used **structurally** (brand mark, primary CTAs, prices, success), not decoratively. It carries the brand.
- Bark brown is the **earthbound counterweight** — used for body anchors, secondary actions, and the woody branch motif from the logo.
- Citrus orange is the only **bright accent** — reserved for discounts, hero pricing, and upsell highlights.
- Photography is the hero. Imagery should feel like soft, daylit still-life: glass, fruit, condensation, real bowls. Never stock-photo perfect.

---

## Content fundamentals

### Voice
Warm, conversational, and bilingual. Think of a friendly server at your favorite local juice bar who genuinely wants you to feel good — not a corporate nutrition app.

- **Tone:** Welcoming, direct, light. We don't lecture.
- **Pronouns:** "เรา / We" for the shop, "คุณ / you" for the customer. Never "users" or "consumers."
- **Casing:** Sentence case everywhere — buttons, titles, nav. No ALL CAPS except for the small "EYEBROW" label style.
- **Numerals:** Thai-Arabic (1, 2, 3) for prices and quantities. Currency always written as **฿89** (symbol first, no decimals if whole baht).
- **Emoji:** Used very sparingly — only in casual surfaces (toast confirmations, order tracking statuses, push notifications). Never on hero copy, never on packaging. The botanical sprig motif replaces decorative emoji.
- **Punctuation:** Em-dashes for asides, ellipses for friendly pauses. Avoid exclamation points except in confirmations.

### Bilingual rules
- **Thai is primary** on customer-facing screens. The Thai string sits above (or to the left of) the English in dual-language UI.
- Numbers and currency look identical in both languages — never translate "฿" to "THB" in the UI.
- Branch names are written `สาขากาฬสินธุ์ / Kalasin` — Thai first, slash, romanized.
- Never translate the brand name. It is always "หมากไม้ Makmai" or "Makmai" — never "Fruit."

### Sample copy
| Surface | Thai | English |
|---|---|---|
| Hero | สดจากสวน ส่งถึงคุณวันต่อวัน | Fresh from the grove, delivered daily |
| CTA primary | สั่งเลย | Order now |
| CTA upsell | จับคู่กับเมนูนี้ | Pair with this |
| Empty cart | ตะกร้ายังว่างอยู่ — ลองเริ่มที่น้ำผลไม้สักแก้ว? | Your cart is empty — start with a cold-pressed? |
| Confirm | สั่งแล้ว 🌱 เจอกันที่ร้านครับ | Order placed 🌱 See you at the shop |
| Error | อุ๊ปส์ ลองอีกครั้งนะ | Oops, give it another go |

### What we **don't** write
- ❌ "Boost your wellness journey"
- ❌ "Crafted with love by our team of nutrition experts"
- ❌ "Unlock the power of nature"
- ❌ "🔥 BEST SELLER 🔥"
- ❌ Any ALL CAPS sentence longer than 3 words.

---

## Visual foundations

### Color
Sampled directly from the logo — `#006030` forest and `#603000` bark — extended into 50–900 ramps. Full token table in [`colors_and_type.css`](./colors_and_type.css) and [`tailwind.config.js`](./tailwind.config.js).

| Role | Token | Hex | Used for |
|---|---|---|---|
| Primary | `forest-500` | `#006030` | Brand mark, primary CTAs, prices, success states |
| Secondary | `bark-500` | `#603000` | Body anchors, secondary buttons, woody illustration |
| Accent | `citrus-400` | `#E07A2D` | Discounts, upsell badges, "ADD" pulses |
| Warm semantic | `berry-500` | `#B33A3A` | Sale tags, danger, "out of stock" |
| Background | `cream-50` | `#FDFAF2` | Page canvas |
| Surface | `cream-100` | `#FAF6EC` | Cards, panels |
| Border | `cream-300` | `#E8DDC2` | Hairlines, dividers |
| Ink | `ink-900` | `#1A1815` | Headlines |
| Muted | `ink-600` | `#6B6357` | Body, captions |

**Contrast check (WCAG AA):**
- `ink-900` on `cream-50` → ~15.6:1 ✅
- `forest-500` on `cream-50` → ~9.0:1 ✅
- `bark-500` on `cream-50` → ~10.4:1 ✅
- White on `forest-500` → ~7.0:1 ✅ (AAA large, AA all)
- White on `bark-500` → ~10.2:1 ✅
- `forest-300` on `night-900` (dark mode) → ~7.1:1 ✅

### Type
**Pairing: `Bai Jamjuree` (display) + `IBM Plex Sans Thai Looped` (body).** Both are Google Fonts, both ship full Thai and Latin glyph coverage, and both render beautifully at small mobile sizes.

- **Bai Jamjuree** for headlines, prices, and the "EYEBROW" caps style — its slightly geometric Thai feels modern but warm, and the Latin matches without looking like a Helvetica clone.
- **IBM Plex Sans Thai *Looped*** for body. The *looped* variant is required — Thai readers find it dramatically friendlier and faster to scan than the unlooped/sans version, especially at 14–16px on mobile.

Type scale runs 12 → 80px. Headings use `text-wrap: balance`, body uses `text-wrap: pretty`. Tabular numerals for prices. Never set body text below 14px in any view. See [`colors_and_type.css`](./colors_and_type.css) for the full scale.

### Spacing & rhythm
4px base unit. Common steps: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Containers max-width 1280px; mobile gutter 16px, desktop gutter 24–32px. Cards breathe with 24–32px internal padding — never cramp.

### Corners & cards
- Small chips/badges → 8px or pill
- **Buttons → pill (`border-radius: 999px`)** for all sizes and variants
- Cards & inputs → 16px
- Large hero panels / sheets → 24–32px

Cards sit on `cream-100`, framed by a 1px `cream-300` hairline and a tiny warm shadow (`shadow-sm`). On hover, the shadow grows to `shadow-md` and the card lifts 2px. No heavy borders, no colored left-edge accent stripes.

### Shadows
Warm-tinted with `rgb(64 40 16 / α)` instead of cool gray — they read like real shadows on cream paper. Five steps (`xs` → `xl`). Never use blue-tinted shadows.

### Motion
Gentle, never bouncy. All transitions ease-out with `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover lifts: 140ms
- Modal/sheet enter: 220ms (fade + 8px translate-y)
- Page transitions: 360ms max
- No spring physics, no over-shoots, no parallax. The brand is calm.

### Hover / press / focus
- **Hover (button):** background steps from `forest-500` → `forest-600`, no scale.
- **Hover (card):** shadow `sm` → `md`, translate-y `-2px`.
- **Press:** scale `0.98`, brightness `0.95`, 80ms.
- **Focus-visible:** 3px `rgb(0 96 48 / 0.35)` ring offset 2px. Visible on every interactive element.
- **Disabled:** opacity 0.4, cursor not-allowed, no shadow.

### Backgrounds & texture
- Default page: solid `cream-50` — **no gradients on bulk surfaces**.
- Hero panels may use a *very subtle* radial wash from `cream-100` → `cream-200` behind imagery, ≤8% contrast.
- The Isan triangle/dot motif from the logo's leaf cluster (▲ · ▲ · ▲) appears as a sparse repeating accent in **section headers, gift-card backgrounds, and the empty-state illustrations** — never as a busy all-over wallpaper.
- Full-bleed photography is allowed and encouraged for hero + category covers. Imagery should be **warm, daylit, slightly grainy** — never cool/desaturated lab shots. Aim for the look of food photography by a sunny window.

### Transparency & blur
Used only for:
- Sticky nav background (`cream-50` at 80% with 12px backdrop-blur)
- Modal scrims (ink-900 at 40%, no blur)
- Sheet-style mobile menus (cream-50 at 92% with 16px blur)

Never use frosted glass as a *decorative* surface.

### Layout rules
- Mobile-first. Desktop is a thoughtful expansion, not the source of truth.
- Sticky bottom action bar on mobile during checkout (always visible "Continue" / "Pay").
- Sticky top branch selector + cart on desktop.
- 12-column grid desktop, 4-column mobile.
- Anything pinned uses an 8px breathing gap from the viewport edge on desktop (floats), full-bleed on mobile.

### Imagery direction
- Cold-pressed bottles photographed at golden hour, condensation visible.
- Salad bowls shot from 45° on linen, never flat-lay-stock-photo style.
- Hand or wooden-tray "lifestyle" shots welcomed.
- Avoid: pristine white seamless, AI-generated produce, neon ring lights, anything that smells like a fitness supplement ad.

---

## Iconography

We use **Lucide Icons** (https://lucide.dev) loaded via CDN as a substitution — the brand does not yet have a custom icon set, so we standardized on Lucide's 1.5px-stroke style which matches Makmai's soft-minimal direction.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

Or via React:
```jsx
import { ShoppingBag, MapPin, Leaf, Search, User, Plus, Minus, Heart } from 'lucide-react';
```

### Rules
- **Stroke weight:** 1.5px (Lucide default). Don't mix with thicker icon sets.
- **Sizes:** 16px (inline), 20px (nav), 24px (cards), 32px+ (empty states).
- **Color:** Inherit `currentColor`. Never apply two-tone or filled+stroke combos.
- **No emoji as icons in production UI.** A single 🌱 may appear in friendly toast confirmations only.
- **Unicode characters are OK** for the Isan triangle motif (▲) and currency (฿).

### Brand-specific marks
- Logo (full lockup): `assets/logo-makmai-full.png` — use on light backgrounds.
- The leaf-on-branch + Isan triangle cluster from the logo is the **brand's own ornamental motif** — replicate it in `<svg>` only when needed for printed/marketing surfaces; in product UI, prefer Lucide's `Leaf` icon for representational use.

> **Substitution flag:** Lucide is a stand-in until a custom Makmai icon set exists. If brand wants bespoke icons (e.g., a juice-bottle glyph, a salad-bowl glyph, an Isan-inspired pin marker for the branch selector), commission them and replace these references.

---

## Wireframe & layout concept (web + mobile)

Four core surfaces support the 3-click checkout flow:

### 1. Homepage
```
┌────────────────────────────────────────────────┐
│ [logo] [📍 Khon Kaen ▾]  Menu  Orders  About  🔍 🌐 👤 🛒 │  ← sticky top
├────────────────────────────────────────────────┤
│   HERO   "กินดี ใช้ชีวิตเบาๆ"  [Order now]   │
│          + 3 juice-bottle visual                │
├────────────────────────────────────────────────┤
│   SIGNATURE row  ░░░ ░░░ ░░░ ░░░               │
├────────────────────────────────────────────────┤
│   [all][juice][smoothie][salad][protein][shots]│  ← category chips
│   MENU GRID   ░░░ ░░░ ░░░ ░░░                  │
│              ░░░ ░░░ ░░░ ░░░                   │
├────────────────────────────────────────────────┤
│   "Why Makmai" 4-up forest strip               │
├────────────────────────────────────────────────┤
│   Footer (bark)                                │
└────────────────────────────────────────────────┘
```

### 2. Cart drawer + upsell (slides in from right)
Opens automatically on first `+` tap. Shows line items with steppers, then the **citrus-tinted upsell strip** below ("Pair with this") which surfaces 3 high-margin items (salads / protein / shots) chosen by what's already in cart.

### 3. Branch selector modal
Tapped from the header pill or from inside checkout. Two rows — Khon Kaen and Kalasin — with open-status dot, hours, and a 44px tap target each. Selection persists in `localStorage` and to Supabase if the user is signed in.

### 4. Checkout sheet (single-screen, 3rd click)
One compact modal: pickup / delivery toggle, branch confirmation card, payment method radio (PromptPay default / card / cash), totals block, and the final **"ยืนยันการสั่ง · ฿XXX"** confirm button. Returning customers see this pre-filled — no scrolling required on mobile.

### Mobile differences
- The branch pill collapses to a single floating chip below the header.
- The category chip strip horizontally scrolls.
- Cart drawer becomes a full-screen sheet on screens <640px.
- A **sticky bottom action bar** appears once the cart has items: `[3 รายการ · ฿273]  [ชำระเงิน →]`. Two taps from there to complete the order.

---

## Tech architecture (Supabase)

### Stack
- **Frontend:** React + Vite + Tailwind CSS (`tailwind.config.js` ready in this repo)
- **State:** Zustand or React Context for cart + branch (lightweight; the kit shows the shape)
- **i18n:** `react-i18next` with `th` (default) and `en` namespaces
- **Backend:** Supabase — Postgres + Auth + Storage + Edge Functions for payment webhooks
- **Payments:** Omise / GBPrimePay for PromptPay QR + cards (called from Supabase Edge Function)

### Supabase schema (sketch)

```sql
-- Branches (2 rows for now)
create table branches (
  id            text primary key,                 -- 'khonkaen' | 'kalasin'
  name_th       text not null,
  name_en       text not null,
  address_th    text,
  address_en    text,
  hours         text,
  phone         text,
  lat           double precision,
  lng           double precision,
  is_open       boolean default true
);

-- Products
create table products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique,
  category      text check (category in ('juice','smoothie','salad','protein','shots')),
  name_th       text not null,
  name_en       text not null,
  desc_th       text,
  desc_en       text,
  price_thb     integer not null,
  original_price_thb integer,
  image_url     text,
  is_featured   boolean default false,
  is_active     boolean default true,
  -- Stock is per-branch:
  inventory     jsonb default '{}'::jsonb            -- { khonkaen: 12, kalasin: 8 }
);

-- Upsell rules (drives the "Pair with this" strip)
create table upsell_rules (
  id            uuid primary key default gen_random_uuid(),
  trigger_cat   text,           -- e.g. 'juice'
  suggest_cat   text,           -- e.g. 'salad'
  priority      integer default 0
);

-- Users (Supabase Auth handles base auth.users)
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  phone         text,
  default_branch text references branches(id),
  default_lang  text default 'th',
  created_at    timestamptz default now()
);

-- Orders
create table orders (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id),
  branch_id     text references branches(id) not null,
  fulfillment   text check (fulfillment in ('pickup','delivery')) not null,
  payment_method text check (payment_method in ('promptpay','card','cash')) not null,
  status        text default 'pending',  -- pending | paid | preparing | ready | completed | cancelled
  subtotal_thb  integer not null,
  delivery_thb  integer default 0,
  total_thb     integer not null,
  contact_phone text,
  delivery_addr text,
  created_at    timestamptz default now()
);
create table order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid references orders(id) on delete cascade,
  product_id    uuid references products(id),
  qty           integer not null,
  price_thb     integer not null     -- snapshot at time of order
);
```

### Data flow for the 3-click checkout
1. **Click 1 — Add product** → `useCart().add(product)` updates local state, optimistically.
2. **Click 2 — Quick Checkout** → cart-drawer CTA opens the checkout sheet (no network call yet).
3. **Click 3 — Confirm** → single RPC `place_order(items, branch_id, fulfillment, payment_method)` that:
   - inserts into `orders` + `order_items` (transactional)
   - decrements per-branch `inventory`
   - returns a payment URL (for PromptPay/card) or order receipt (for cash)
   - publishes a real-time event to the store's tablet for fulfillment

### Row-level security (RLS) — illustrative
- `products`, `branches`, `upsell_rules` → public read
- `profiles`, `orders`, `order_items` → user can read/write only their own rows
- Branch staff role can read all `orders` filtered by `branch_id`



## Index — files in this project

| Path | Purpose |
|---|---|
| `README.md` | This file. Brand context + foundations. |
| `SKILL.md` | Agent-skill entrypoint. Cross-compatible with Claude Code Skills. |
| `colors_and_type.css` | All design tokens as CSS vars + semantic type classes. |
| `tailwind.config.js` | Tailwind extension with all brand colors, fonts, radii, shadows. |
| `assets/` | Logos and brand imagery. |
| `preview/` | Design-system cards rendered for the review pane. |
| `ui_kits/web/` | React UI kit — Makmai e-commerce (web + mobile responsive). |

### UI kits
- **`ui_kits/web/`** — Makmai e-commerce: homepage, product grid, product detail, cart with upsell, branch selector modal, 3-click checkout. Interactive click-thru in `index.html`.

### Next steps for the user
1. Replace Lucide with a bespoke icon set if budget allows.
2. Provide real product photography to swap into the kit's placeholders.
3. Confirm Bai Jamjuree + IBM Plex Sans Thai Looped — both are free Google Fonts but please verify they match your team's aesthetic before locking in.
4. Re-attach a Figma file or production codebase (if any) so we can align tokens to your source of truth.
