# Plan: Samash No-Black Palette Refresh

> Created: 2026-05-18
> Status: completed
> Trigger: Client feedback says the Samash landing page should not use black anywhere; user proposed red and white with dark blue text where black text is currently used, using blue from the current brand color.

## Goal & Success Criteria
- **Goal**: Transform the Samash landing page into a no-black red, white, and dark-blue visual system while preserving the current conversion-focused structure.
- **Done when**: No visible black or near-black colors remain in the Samash landing page, text that currently reads as black uses dark blue, red remains the primary action color, and the page passes desktop/mobile visual review.
- **Non-goals**: Rewriting copy, changing page content hierarchy, replacing assets, or redesigning the lead capture flow.

## Current State
- `samash/src/App.tsx` sets the global surface/text classes through Tailwind tokens: `bg-canvas text-ink`.
- `samash/tailwind.config.js` currently defines `ink: #111827`, `body-strong: #374151`, `body: #4B5563`, and `mute: #6B7280`; these read as black/gray rather than brand blue.
- `samash/src/index.css` contains the strongest black usage in the hero light field and gradient bar effects, including `#0A0A0A`, `rgba(10, 10, 10, ...)`, `rgba(0, 0, 0, ...)`, and related dark overlays.
- `samash/src/components/Hero.tsx`, `ProblemSection.tsx`, and `WhoIsThisFor.tsx` use black or near-black section backgrounds, dark cards, white text, and white borders.
- Many content sections use Tailwind gray utilities such as `text-gray-900`, `text-gray-700`, `bg-gray-50`, `border-gray-200`, and shadows with black alpha.

## Task Breakdown

| # | Task | Files | Size | Depends On |
|---|------|-------|------|------------|
| 1 | Define a no-black brand palette in Tailwind tokens | `samash/tailwind.config.js` | S | - |
| 2 | Replace hero black gradients with blue-to-white/red energy treatment | `samash/src/index.css`, `samash/src/components/Hero.tsx` | M | T1 |
| 3 | Convert dark storytelling sections to white/blue surfaces | `samash/src/components/ProblemSection.tsx`, `samash/src/components/WhoIsThisFor.tsx` | M | T1 |
| 4 | Replace gray/black text utilities across remaining sections with tokenized blue text and soft borders | `samash/src/components/*.tsx`, `samash/src/App.tsx` | M | T1 |
| 5 | Remove black-alpha shadows and image borders; replace with red/blue translucent shadows and borders | `samash/src/components/*.tsx`, `samash/src/index.css` | S | T2-T4 |
| 6 | Run build and visual QA on desktop/mobile | `samash` app | S | T2-T5 |

## Technical Design
- **Approach**: Keep red as the conversion/action color and make dark blue the replacement for black text, deep cards, and section contrast. Use a palette like deep blue for text (`#0B2A4A` or the exact brand blue if confirmed), softer blue for secondary text (`#315477`), pale blue for surfaces (`#F3F8FF`), white for primary canvas, and current red for CTAs/accent. The hero can stay dramatic without black by using a deep-blue-to-white composition with red light bars, avoiding any pure black or near-black overlay. Components should move away from hard-coded `gray-*`, `white/10`, and `black/*` classes toward named Tailwind tokens so the no-black rule stays maintainable.
- **Alternatives rejected**: All-red-and-white only, because it will feel too aggressive and reduce reading comfort. Keeping dark sections but swapping black to navy everywhere, because it may still feel visually "black" to the client if the navy is too dark or covers large areas. A purely cream/pastel refresh, because it would drift away from the stated brand direction and weaken the existing high-energy IELTS test positioning.
- **Key decisions**: Use blue mainly for text, structure, and depth; use red mainly for CTAs, highlights, icon accents, and progress/energy elements. Avoid surfaces darker than the approved brand blue unless the client explicitly allows navy panels.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Red plus blue feels loud or political | M | M | Keep white dominant, blue calm, red limited to actions and accents |
| Dark blue is perceived as black | M | H | Use a visibly blue value, not near-black navy, and avoid large dark fills |
| Removing black reduces hero drama | M | M | Replace contrast with blue gradients, red energy, image depth, and white-space hierarchy |
| Broad class replacement causes inconsistent states | M | M | Replace through tokens and verify every section visually |
| Contrast drops on pale blue/red surfaces | L | H | Check key text/button contrast during visual QA |

## Verification
- Run `npm run build` inside `samash`.
- Search for remaining black references in `samash/src` and `samash/tailwind.config.js`: `black`, `#000`, `#0A0A0A`, `#050505`, `#111`, `rgba(0,0,0`, `rgb(0,0,0`, and dark gray utilities that visually read as black.
- Open the landing page locally and review desktop and mobile widths.
- Confirm hero, problem section, audience section, form, sticky CTA, thank-you state, and final CTA still feel cohesive.
- Rollback plan: revert the palette/theme commit or restore previous Tailwind tokens and component classes if the client rejects the direction.
