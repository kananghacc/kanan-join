---
name: verify-kanan-landing
description: Drive Kanan landing-1 static landing pages in a real browser. Use after changing landing page CTAs, responsive forms, testimonials, trainer cards, or thank-you navigation. Includes GCC recipes and captures screenshots, ARIA snapshots, network logs, and a browser trace.
---

# Verify Kanan landing pages

The primary surface is static HTML served from the checkout. The seeded map covers `/ielts-online-coaching-gcc/`; it does not stand for every campaign. Read [features/README.md](features/README.md), then the relevant feature file. Other surfaces include the IELTS retakers React app and JunoHub Next.js app; these need their own build and feature recipes. Do not drive their source folders as static apps.

## Launch

Run from the repository root. The helper needs Python 3, Node, the `playwright/test` package, and a compatible Chromium executable. In Codex, the helper detects the bundled Node packages and an installed browser cache. Outside Codex, set `VERIFY_NODE`, `NODE_PATH`, and optionally `VERIFY_BROWSER` to installed paths. It fails with a diagnostic if unavailable; do not install dependencies blindly.

```sh
rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature demo --evidence /tmp/kanan-demo-proof-$(date +%Y%m%d-%H%M%S)
rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature all --evidence /tmp/kanan-audit-proof-$(date +%Y%m%d-%H%M%S)
```

This one command runs launch, doctor, drive, evidence capture, and cleanup. Use a new evidence path for every run; existing paths are refused. The helper starts this repo's `dev_server.py --host 127.0.0.1 --port <allocated-port>` using the current Python executable. HTTP readiness requires the GCC page to match the local source bytes and the owned child to remain alive. No build, seed data, authentication, or environment secrets are needed for the static UI. Do not use the root README's stale workspace npm commands. Do not run `build.sh` for this proof: it injects analytics into source and builds unrelated apps.

Each run owns a separate loopback port, process, and disposable browser context. Port collisions cause failure instead of attaching to a shared instance. Two runs can use separate evidence directories. Teardown always stops the owned server in `finally`, and closes the browser context and browser. Do not drive the user's open browser session.

`--feature all` keeps one owned server alive for the whole audit and drives the four features serially. Each feature gets a fresh browser context and an evidence subdirectory. The doctor runs before and after each feature. An assertion failure closes that browser and preserves its proof; the next feature starts from a fresh browser state after another doctor check. The server stops after the final feature.

## Doctor

The helper's read-only doctor checks that its server child is alive and that `GET /ielts-online-coaching-gcc/` is byte-for-byte equal to `ielts-online-coaching-gcc/index.html`. It records the server PID, URL, and SHA-256 in `run.json`. On any suspicious result, inspect that file and `server.log` first. A `doctor` entry is required before accepting browser evidence. This is a source-server proof, not proof of Netlify redirects or a production bundle.

## Drive

```sh
rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature testimonials --evidence /tmp/kanan-testimonials-proof-$(date +%Y%m%d-%H%M%S)
rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature trainers --evidence /tmp/kanan-trainers-proof-$(date +%Y%m%d-%H%M%S)
rtk proxy .cursor/skills/verify-kanan-landing/verify.py --feature thank-you --evidence /tmp/kanan-thank-you-proof-$(date +%Y%m%d-%H%M%S)
rtk proxy bash scripts/verify-gcc-landing.sh
```

`demo` clicks every visible consultation CTA at desktop and mobile widths. Desktop must show the registration modal, preserve the Tally form URL, and close through its close button or backdrop. Mobile must scroll the inline form into view without opening the modal. Before a click, the harness waits for locator scrolling to settle; otherwise the browser's smooth scroll can conflict with the button's own smooth scroll. The other commands follow the feature map. The existing shell check supplements browser proof with campaign, phone, embed, and removed-WhatsApp source assertions; it cannot prove visible behavior.

Use public browser clicks and navigation. Reading DOM state for assertions is allowed; calling `openConsultationForm()` or changing classes directly is not a user-path proof. Stable IDs are used for unlabeled carousel and close buttons. Add recipes when another campaign differs; never report an unvisited campaign as verified.

## Evidence

The exact `--evidence` directory holds `run.json`, `result.json`, `requests.json`, `server.log`, `browser.log`, `trace.zip`, and before/action/after PNG and ARIA files. The trace captures actions and resulting states. Screenshot files show the actual page identity. Require exit code zero, `doctor`, `source_unchanged: true`, `cleanup`, and `result.json` status `passed`; inspect screenshots and trace for visual failures. Report page errors and skipped paths even when behavior assertions pass.

For `all`, `run.json` and `server.log` are at the evidence root; browser artifacts are under `demo/`, `testimonials/`, `trainers/`, and `thank-you/`. Each has `console.json` for browser messages, and failed assertions also capture `failure.png` and `failure.aria.txt`. Require all four feature reports to pass and `evidence_retained: true` in the root report. Screenshot capture finishes CSS animations for legible proof; it does not verify animation timing.

The harness aborts non-GET/HEAD requests and known analytics hosts at their external network boundary. It does not replace Tally with a fake success response. `requests.json` records each attempted request and whether it was blocked. This is not a production submission proof: no CRM record, Tally completion redirect, phone dial, or analytics delivery is verified. Tally/font/CDN failures must be reported; an iframe's presence does not prove that its form loaded. Do not submit real personal details to get a green check. For authorized integration proof, use a separately configured test form and verify its stored record and redirect. Capture those side effects, not just a thank-you screen. Direct thank-you navigation verifies rendering and the return link only.

This is not a dry-run API. Observe `requests.json` for suppressed mutations and `run.json` for source hash preservation. Production GET resources such as Tally and styles may still be fetched. Mocks are permitted only at an existing production boundary, and every such limit belongs in the proof report.

## Cleanup

The helper stops only its child server and closes only its disposable browser. It does not kill by process name. Failed runs use the same `finally` cleanup. Evidence survives teardown, including failed-run logs and traces. Confirm `run.json` and `trace.zip` still exist after the command finishes. If the helper itself is externally terminated, inspect the recorded server PID and command ownership before terminating that exact process; do not use `pkill`.

## Helpers

- `verify.py` is executable. Invoke it through `rtk proxy` as shown above; `--feature` selects a map recipe and `--evidence` names a fresh retained directory.
- `drive.cjs` is executable but normally called by `verify.py`. For diagnosis against a server you already own: `rtk proxy node .cursor/skills/verify-kanan-landing/drive.cjs http://127.0.0.1:8080 /tmp/kanan-manual-proof demo`. Create that output directory first and configure `NODE_PATH`. This command owns browser cleanup only; you own server teardown and doctor checks.

Maintain recipes with `/maintain-verification-skill` when user paths change.
