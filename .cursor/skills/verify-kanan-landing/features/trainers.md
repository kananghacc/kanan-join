# Trainer details

Visitors read trainer experience and specialties. Mobile cards use a View details disclosure.

## Sub-features

- `trainer-mobile-open-close`: expand and collapse each of four trainer cards.
- `trainer-desktop`: trainer details appear without mobile disclosure controls.

## How to get to it (user POV)

- Scroll to the trainers section of `/ielts-online-coaching-gcc/`.
- On mobile, choose `View details` on Anupama Rk or another trainer card.

## Driving it with Playwright

Preconditions: helper doctor passes; viewport width 390 for disclosure proof.

- **All disclosures.** Run `rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature trainers --evidence /tmp/kanan-trainers-proof-$(date +%Y%m%d-%H%M%S)`. It clicks each `#trainers details summary`, checks the native `open` attribute, captures the expanded card, then clicks again and verifies collapse.
- **Desktop entry.** The same command first checks four visible desktop detail panels containing `Key Strengths:` and captures the desktop section. Then it changes to mobile width for disclosure actions. Inspect screenshots for readable specialties and clipping; assertions alone do not prove visual quality.

## Gotchas

- Four summaries share `View details`; scope to one card before clicking.
- Native disclosure state is read for assertions only; do not set `open` internally.
- Inspect the screenshot for content clipping as well as the `open` assertion.
