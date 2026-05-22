# Makmai E-commerce UI Kit

A React + Tailwind-flavored UI kit recreating the Makmai (หมากไม้) cold-pressed juice and healthy-food store. Bilingual (Thai / English), mobile-first, with the 3-click checkout flow wired end-to-end.

## Run it
Open `index.html` directly. No build step — React + Babel run inline.

## Screens
The kit demonstrates the full purchase flow:

1. **Homepage** — branch selector pill, hero, signature menu, category chips, featured product grid.
2. **Product grid** — filterable by category chip, with quick-add per card.
3. **Cart drawer** — slides in from the right when you add an item. Includes the **Upsell strip** ("จับคู่กับเมนูนี้ / Pair with this") to drive AOV.
4. **Checkout sheet** — branch confirmation, contact, payment method, confirm. The 3rd click completes the order.
5. **Confirmation** — toast + summary screen.

## The 3-click rule (built in)
- **Click 1:** Tap `+` on any product → cart drawer auto-opens with item.
- **Click 2:** Tap `ชำระเงิน / Checkout` in the drawer → checkout sheet slides up.
- **Click 3:** Tap `ยืนยันการสั่ง / Confirm` → order placed.

A logged-in / returning user with a saved branch + payment method completes the order in 3 taps from product list. New users insert phone OTP + branch as a single inline step before click 3.

## Components
| File | Purpose |
|---|---|
| `App.jsx` | App shell, page state, cart/checkout orchestration |
| `Header.jsx` | Sticky top: logo, branch pill, search, account, cart |
| `Hero.jsx` | Bilingual hero with primary CTA |
| `CategoryChips.jsx` | Horizontal scrolling filter chips |
| `ProductCard.jsx` | Image, badge, name, price, quick-add |
| `ProductGrid.jsx` | Responsive product grid |
| `UpsellStrip.jsx` | "Pair with this" cross-sell |
| `BranchModal.jsx` | Branch picker (Kalasin / Khon Kaen) |
| `CartDrawer.jsx` | Slide-in cart with line items + upsell + CTA |
| `CheckoutSheet.jsx` | Final confirmation step (branch, contact, payment) |
| `Confirmation.jsx` | Post-order screen |
| `Footer.jsx` | Brand mark, locations, social |
| `data.js` | Product, category, branch fixtures |
| `Icons.jsx` | Thin Lucide-style SVG icons (no CDN dependency) |

## Tech notes
- All components are functional React with hooks. No external CSS framework — styles inline + a small token strip from `colors_and_type.css` (re-declared at top of `index.html` to keep the kit self-contained).
- Tailwind classes shown in `tailwind.config.js` are the production target — the prototype uses inline styles for portability.
- For a Supabase mapping reference, see the bottom of `index.html` / project root README.

## Caveats
- Product imagery is placeholder gradients (color = fruit). Swap in real photography.
- Branch hours, phone, address are illustrative.
- No real payment integration; the confirm button is a stub.
