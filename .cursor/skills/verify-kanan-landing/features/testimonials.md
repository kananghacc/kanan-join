# Testimonials

Visitors move through student results with desktop arrows and dots or mobile dots.

## Sub-features

- `testimonials-next-prev`: desktop arrows move forward and backward.
- `testimonials-dots`: three desktop dots and six mobile dots select a slide.
- `testimonials-auto`: slides advance automatically every five seconds.

## How to get to it (user POV)

- Scroll to the success stories section and choose an arrow or dot on desktop.
- On mobile, use the testimonial dots near the hero.

## Driving it with Playwright

Preconditions: helper doctor passes; start at `/ielts-online-coaching-gcc/`.

- **Arrows.** Run `rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature testimonials --evidence /tmp/kanan-testimonials-proof-$(date +%Y%m%d-%H%M%S)`. It clicks `.carousel-dot[data-slide="0"]`, `#next-btn`, then `#prev-btn`. Active dots must change to slide 1 and back to 0, with visible screenshots.
- **All dots.** The command clicks all three `.carousel-dot[data-slide]` desktop controls, then all six `.mobile-carousel-dot[data-slide]` controls at width 390. It asserts the active control and carousel translation, logs each action, and captures the resulting cards.
- **Autoplay.** The command observes the next active dot within 6.5 seconds on both viewports without changing timers. It captures the wrap from desktop slide 2 and mobile slide 5 back to slide 0.

## Gotchas

- Buttons have no accessible labels; use their stable IDs or `data-slide` values.
- Autoplay can race assertions. Reset with a dot immediately before a manual navigation assertion.
- Active styling alone does not prove the right card is visible; inspect captured screenshots and trace.
