# Thank-you navigation

The GCC confirmation page explains next steps and provides a contact phone and a return link.

## Sub-features

- `thank-you-render`: registration message and next steps appear.
- `thank-you-phone`: contact link points to +91 92281 22552.
- `thank-you-back`: return to the GCC coaching page.
- `thank-you-redirect`: actual Tally completion redirects here; separate integration proof required.

## How to get to it (user POV)

- After completing the external registration form, arrive at `/ielts-online-coaching-gcc/thank-you.html`.
- For rendering verification only, visit that URL directly.
- Choose `Call: +91 92281 22552` or `← Back to GCC IELTS Coaching Page`.
- On desktop, the header also offers `Call Now` and `Back to Home`.

## Driving it with Playwright

Preconditions: helper doctor passes; no real external registration is submitted.

- **Rendering and return.** Run `rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature thank-you --evidence /tmp/kanan-thank-you-proof-$(date +%Y%m%d-%H%M%S)`. It directly visits the page, checks `Thank You for Registering!`, verifies the main call link destination `tel:+919228122552`, captures it, clicks the main back link, and verifies the GCC page heading. It repeats the visit and clicks the header `Back to Home` link.
- **Header telephone entry.** The command also checks `getByRole('link', {name:'Call Now', exact:true})` and requires `href` equal to `tel:+919228122552`. It inspects both call destinations without launching a phone app.
- **Source consistency.** Run `rtk proxy bash scripts/verify-gcc-landing.sh` to check both thank-you phone strings and campaign URLs.
- **Submission redirect.** Excluded from this recipe. Use an authorized test Tally form and capture submission, persisted record, and redirect before claiming this path works.

## Gotchas

- Direct navigation is not proof that a registration was received, despite the page's wording.
- Link inspection proves the telephone destination, not an actual call or external phone-app launch.
- The return link is relative `index.html`; keep the campaign path when driving it.
