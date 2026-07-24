# Bundle Builder

A two-column bundle-builder experience: a 4-step accordion on the left for
assembling a security system (cameras, plan, sensors, extra protection),
with a live "Your security system" review panel that reflects every selection
and recalculates totals in real time.

## Run it

```bash
npm install
npm run dev
```

Then open the printed localhost URL (Vite defaults to `http://localhost:5173`).

Production build / type-check:

```bash
npm run build
```

## Stack

Vite + React 19 + TypeScript + Tailwind CSS. No backend: the catalog and the
seeded initial state are served from `src/data/bundle.json` (the backend/API
was listed as a bonus; I kept the data local to keep the clone-and-run story
trivial).

## How the state works

- **Quantities are keyed by variant, not by product.** Each product's
  selection tracks an `activeVariant` plus a `quantities` map with one entry
  per variant id. That's what makes "add 2 Red, switch to Blue" behave
  correctly: the card's stepper binds to whichever variant is active (Blue,
  reading 0), while Red's count is untouched and still shows as its own line
  in the review panel.
- **One reducer, one store** (`src/state/bundleReducer.ts`, exposed through
  React Context in `src/state/BundleProvider.tsx` / `src/state/useBundle.ts`).
  The product-card steppers and the review-panel steppers dispatch the same
  `ADJUST_QUANTITY` action against the same store, so they can never drift out
  of sync.
- **Everything else is derived, not stored.** Review lines, per-step
  "N selected" counts, totals, savings, and the financing estimate are all
  computed from `selections` + the static catalog
  (`src/state/selectors.ts`, `src/state/useReviewData.ts`).

## Component layout

- `App.tsx`: page shell, accordion of steps, responsive two-column layout
- `components/AccordionStep.tsx`: step header (STEP X OF 4, icon, title,
  "N selected", chevron) + collapse behavior
- `components/ProductCard.tsx`: card with badge, image (follows the active
  variant), description, variant chips, stepper, pricing
- `components/VariantChips.tsx`: per-product color/variant selector
- `components/ReviewPanel.tsx` + `components/review/*`: the review panel,
  split into line items / category groups / summary, each rendered in a
  compact (`sm`) and wide (`lg`) visual variant from the same components
- Breakpoints: phone (single column, full-bleed), `md` tablet/laptop
  (768px builder + sticky sidebar that absorbs the remaining width), `xl`
  desktop (full-width card rows, wide two-column review panel below)

## Persistence: "Save my system for later"

Clicking **Save my system for later** snapshots the current `selections` to
`localStorage` (with visual confirmation). On the next visit/reload the saved
system is restored exactly as it was at save time; the accordion still opens
on step 1 per the spec.

Deliberate choice: state is **not** auto-saved on every change; the save
link is the persistence contract. A fresh, never-saved load always shows the
seeded design state.

## Decisions / tradeoffs

- **Checkout** is a placeholder (allowed by the brief); it has nowhere to go.
- **Financing line** ("as low as $X/mo") is a simple `total / 12` estimate;
  there were no real financing terms in the brief.
- **Selected variant** chips get a highlighted swatch (a tinted
  `#1DF0BB0A` background behind the thumbnail with a `0.5px #0AA288` border)
  so the active color reads clearly; the underlying selection/quantity
  behavior is what drives the review panel.
- **Seeded items** (sensors, accessory, plan) are fully interactive products
  in their steps rather than review-only rows; the review panel treats them
  identically to anything the shopper adds.
- **Free items** are supported: any product with `price: 0` renders as "FREE"
  with its compare-at price struck through and counts that compare-at value
  toward the savings callout. (No seeded product currently uses this; the
  Sense Hub is priced.)
- Product imagery is pulled from official Wyze product pages.
- **Price source of truth:** where the design's review-panel figures don't
  multiply out from the card prices, the card prices win; review lines and
  totals are always derived (`price × quantity`) from the same catalog entry
  the card renders, never stored separately.
