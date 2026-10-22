# Kanan static landing verification map

Baseline: the helper owns a fresh loopback static server, verifies served source, and uses a disposable Chromium context. Run commands from the repository root. External submission is excluded and logged; no authentication or seed data is needed. Proof applies to source HTML, not Netlify deployment behavior.

Read the matching feature entry before running. Report the feature, viewport, entry points, artifact directory, and any skipped path. Screenshots, ARIA snapshots, action traces, and network logs survive cleanup. Do not report a direct thank-you visit as a completed registration.

For a complete mapped-feature audit, run `rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature all --evidence /tmp/kanan-audit-proof-$(date +%Y%m%d-%H%M%S)`. It uses one server, serial browser drives, and fresh browser state between features. External registration persistence and redirect remain outside this local audit and require a test Tally form with access to its stored responses.

## Features

- [Demo booking](demo.md): every visible consultation CTA on desktop and mobile; modal close and inline form reachability.
- [Testimonials](testimonials.md): desktop next/previous and dots; mobile dots.
- [Trainer details](trainers.md): four mobile disclosures, with desktop details already shown.
- [Thank-you navigation](thank-you.md): confirmation content, phone destination, return link.

Coverage starts with GCC. Root IELTS, SAT, country campaigns, IELTS retakers, and JunoHub are separate entry points, not implicitly verified by this map. Extend the map from their actual UI before claiming coverage. One feature is enough to validate the generated skill; changes spanning several mapped features require the affected recipes. Explicitly list untested controls described in an entry.
