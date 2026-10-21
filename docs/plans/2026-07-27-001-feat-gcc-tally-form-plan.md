---
title: "feat: Replace GCC Tally lead form"
type: feat
date: 2026-07-27
created_at: 2026-07-27
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# feat: Replace GCC Tally lead form

## Goal Capsule

- **Objective:** Use the supplied Tally form for every lead-capture entry point on the GCC IELTS coaching landing page.
- **Authority:** The requested form at `https://tally.so/r/aQXeqq` and the page’s established dual-surface Tally pattern are authoritative.
- **Stop conditions:** Do not alter the Tally form configuration, its questions, its completion redirect, or unrelated page design and CTA behavior.
- **Execution profile:** Localized static HTML integration change with browser smoke verification.

## Product Contract

### Summary

Replace the retired lead form on the GCC landing page with the supplied “Register For Free 1:1 Demo Class” Tally form.
The same form must load when a mobile visitor reaches the inline lead section and when a desktop visitor opens a booking modal.

### Problem Frame

The GCC page currently embeds form `5BvVLb` in both lead-capture surfaces.
The approved form is now `aQXeqq`, which collects the name, phone number, email, intended IELTS timing, and demo date before redirecting a completed submission to the existing GCC thank-you page.

### Requirements

- R1. Replace both GCC-page Tally embeds with the supplied `aQXeqq` form using Tally’s inline embed URL, preserving the existing loader, lazy loading, responsive width, and dynamic-height options.
- R2. Preserve one consistent lead experience: mobile CTA interactions scroll to the inline form and desktop CTAs open the modal containing the same supplied form.
- R3. Keep the form’s accessible titles accurate for the GCC IELTS coaching context.
- R4. Leave form questions, hidden fields, Tally-side settings, lead routing, analytics, thank-you content, and non-form page content unchanged.

### Acceptance Examples

- AE1. When a visitor uses the GCC page on a narrow viewport, the inline form loads the supplied Tally form instead of the retired form.
- AE2. When a desktop visitor selects any “Book Free Demo Class” CTA, the modal opens and displays that same supplied form.
- AE3. When the form completes, its existing Tally-configured redirect points to the GCC thank-you page without local JavaScript taking over submission handling.

### Scope Boundaries

- **Included:** Repointing both existing GCC form embeds, keeping their embed configuration coherent, and validating their mobile and desktop presentation.
- **Deferred to Follow-Up Work:** UTM-to-hidden-field propagation, form submission analytics events, and custom success-state behavior.
- **Outside this change:** Editing the Tally form, lead operations, GTM/Umami configuration, CTA copy, and the GCC thank-you page.

## Planning Contract

### Key Technical Decisions

- KTD1. **Reuse the existing inline-embed mechanism.** Update only the form identifier inside each `data-tally-src` URL; the page already loads Tally’s official embed widget once and both surfaces use its dynamic-height behavior.
- KTD2. **Keep the two presentation surfaces synchronized.** The mobile inline embed and desktop modal are intentionally distinct UX surfaces but must point to the same form and use matching accessibility metadata.
- KTD3. **Let Tally own submission completion.** The supplied form already redirects to `/ielts-online-coaching-gcc/thank-you`; the static page must not add competing submit handlers or redirects.

### Risks & Dependencies

- Tally is an external dependency: confirm that its widget script loads the new form and resizes it in both surfaces.
- The form has a longer multi-field flow than the retired embed, so dynamic height must remain enabled and must be checked on a narrow viewport as well as in the desktop modal.
- The requested form’s configuration is managed outside this repository; any question or redirect correction belongs in Tally, not in this change.

### Sources & Research

- `ielts-online-coaching-gcc/index.html` contains the existing inline and modal embeds, the shared widget-loader guard, and the mobile-versus-desktop CTA behavior.
- `docs/plans/2026-07-24-001-feat-gcc-ielts-campaign-plan.md` documents the GCC page’s original shared-form contract, which this change intentionally supersedes.
- `https://tally.so/r/aQXeqq` is the requested active form. Its published configuration targets the existing GCC thank-you URL after submission.

## Implementation Units

### U1. Replace the GCC lead-form source

- **Goal:** Point every current GCC lead-capture surface at the supplied Tally form without changing its surrounding conversion flow.
- **Requirements:** R1, R2, R3, R4.
- **Dependencies:** None.
- **Files:** `ielts-online-coaching-gcc/index.html`.
- **Approach:**
  1. Change the mobile inline and desktop-modal `data-tally-src` values from the retired form ID to the supplied form’s inline embed endpoint.
  2. Retain the existing options for left alignment, hidden title, transparent background, lazy loading, full-width rendering, and dynamic height.
  3. Keep both iframe titles descriptive of the GCC IELTS lead form and leave the deduplicated widget-loader and modal scripts intact.
- **Patterns to follow:** The paired mobile and modal Tally embeds already in `ielts-online-coaching-gcc/index.html`; the same standard widget pattern used across other static landing pages.
- **Test scenarios:**
  - Covers AE1. On a narrow viewport, the inline iframe resolves to the supplied `aQXeqq` Tally form and expands to show its required fields.
  - Covers AE2. On a desktop viewport, every booking CTA opens the modal and the modal iframe resolves to the same `aQXeqq` form.
  - Covers AE3. Submitting a valid response follows the form’s configured redirect to the GCC thank-you page, with no page-level submit handler or duplicate redirect.
  - The page source contains exactly two active GCC form embeds, both with the supplied ID and matching dynamic-height configuration; it contains no retired `5BvVLb` GCC embed.
- **Verification:** Browser-smoke the inline and modal flows at mobile and desktop breakpoints, then inspect the rendered iframe URLs and the Tally completion destination.

### U2. Verify the static integration contract

- **Goal:** Confirm that the narrow source change preserves the page’s intended lead-routing behavior and does not leave an inconsistent form surface.
- **Requirements:** R1, R2, R3, R4.
- **Dependencies:** U1.
- **Files:** `ielts-online-coaching-gcc/index.html`.
- **Approach:** Compare both embed declarations after the edit and perform a static/source check plus responsive browser smoke coverage; do not introduce a new test harness for this single static integration replacement.
- **Execution note:** This is a static external-embed change; favor source assertions and runtime smoke verification over unit-test scaffolding.
- **Patterns to follow:** Existing campaign verification practice in `docs/plans/2026-07-24-001-feat-gcc-ielts-campaign-plan.md`.
- **Test expectation:** none -- this unit adds no product behavior or testable code; it proves the completed static integration.
- **Verification:** Confirm no stale form ID remains in the GCC page, the widget script is present only through its existing guarded loader, and both responsive lead paths render the supplied form.

## Verification Contract

| Gate | Applies to | Done signal |
| --- | --- | --- |
| Source consistency | U1, U2 | Both GCC `data-tally-src` values use `aQXeqq`, preserve dynamic height, and no `5BvVLb` reference remains in the page. |
| Mobile browser smoke | U1, U2 | The inline form is visible, complete, and scrollable after a mobile CTA interaction. |
| Desktop browser smoke | U1, U2 | Each booking CTA opens the modal, which displays the same supplied form at an accessible size. |
| Completion smoke | U1 | A controlled form submission follows Tally’s configured GCC thank-you redirect without a local submission error. |

## Definition of Done

- Both existing GCC lead-form surfaces embed `aQXeqq` through the established Tally widget pattern.
- The mobile inline and desktop modal experiences remain functional and accessible.
- No retired `5BvVLb` embed remains in `ielts-online-coaching-gcc/index.html`.
- Tally retains ownership of collection and the configured GCC thank-you redirect.
- Source consistency and responsive browser smoke checks pass.
- No unrelated HTML, analytics, Tally configuration, or form-routing changes are included.
