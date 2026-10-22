# Demo booking

GCC students reach a free demo registration form from consultation buttons. Desktop opens a modal; mobile scrolls to the inline form.

## Sub-features

- `demo-desktop`: each visible consultation button opens the registration modal.
- `demo-close`: the modal close button returns to the page.
- `demo-mobile`: each visible consultation button scrolls to the mobile form.
- `demo-external`: Tally form completion and persisted registration require a separate test integration.

## How to get to it (user POV)

- Open `/ielts-online-coaching-gcc/` and choose the header or hero demo button.
- Choose consultation buttons in features, reasons, success stories, trainers, or the final application section.
- On mobile, use the same visible buttons or scroll directly to the inline registration form.
- On desktop, close through the X button or by clicking the modal backdrop.

## Driving it with Playwright

Preconditions: helper doctor passes; desktop width 1440 and mobile width 390; external form submission remains blocked.

- **All CTA entries.** Run `rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature demo --evidence /tmp/kanan-demo-proof-$(date +%Y%m%d-%H%M%S)`. The harness clicks each visible `button[onclick="openConsultationForm()"]` at both widths and logs index and text.
- **Desktop state.** Expect `#consultation-modal` visible and its heading `Register For Free 1:1 Demo Class`; iframe configuration retains Tally embed `aQXeqq`. Click its `button[onclick="closeConsultationForm()"]`; expect the modal hidden.
- **Mobile state.** Expect `#mobile-form-section` in the viewport and the desktop modal hidden. Capture every CTA's resulting state.
- **Backdrop entry.** The automated recipe reopens the header demo modal and clicks the empty backdrop outside `.modal-content`; it requires the modal to become hidden. The click position is scoped to the backdrop's empty upper corner because it has no separate accessible control.

## Gotchas

- Duplicate CTA names require scoped handles; do not use an ambiguous global text click.
- The breakpoint is 768px; mobile changes the action rather than opening a modal.
- Native smooth scrolling needs an observed viewport assertion, not a fixed delay.
- No Tally submission or CRM persistence is proven. Form configuration is distinct from successful remote loading.
- Wait for the browser's automatic locator scrolling to settle before clicking each CTA. Otherwise that scrolling can conflict with the CTA's own smooth scroll and give a false mobile viewport failure. Use observed scroll stability, not a fixed sleep or internal setters.
