#!/usr/bin/env node
/**
 * Ensures crm-lead-routing.json covers every CRM form slug and
 * exercises submit-lead-core routing (no live CRM call).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const REQUIRED_SLUGS = [
  'australia',
  'canada',
  'uk',
  'us',
  'germany',
  'german-language',
  'dubai',
  'h1b-canada',
  'to-canada-from-vadodara',
  'study-french-learning',
  'study-french-india',
  'ielts-chennai',
  'study-french',
  'ielts-online-training',
];

const ROUTING_PATH = path.join(ROOT, 'shared/crm-lead-routing.json');
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertRoutingFileSlugs() {
  const raw = fs.readFileSync(ROUTING_PATH, 'utf8');
  const routing = JSON.parse(raw);
  const missing = REQUIRED_SLUGS.filter((slug) => !routing[slug]);
  if (missing.length) {
    console.error('Missing slugs in crm-lead-routing.json:', missing.join(', '));
    process.exit(1);
  }
  for (const slug of REQUIRED_SLUGS) {
    const entry = routing[slug];
    for (const key of ['organisation_id', 'branch_id', 'owner_id']) {
      if (!entry[key] || !String(entry[key]).trim()) {
        console.error(`Routing config missing ${key} for slug: ${slug}`);
        process.exit(1);
      }
    }
  }

  const pending = REQUIRED_SLUGS.filter((slug) => {
    const entry = routing[slug];
    return (
      !UUID_RE.test(entry.organisation_id) ||
      !UUID_RE.test(entry.branch_id) ||
      !UUID_RE.test(entry.owner_id)
    );
  });
  if (pending.length) {
    console.warn(
      'Warning: replace placeholder UUIDs in crm-lead-routing.json for:',
      pending.join(', ')
    );
  }
}

function assertRoutingLogic() {
  const routing = JSON.parse(fs.readFileSync(ROUTING_PATH, 'utf8'));
  const studyFrench = routing['study-french'];

  delete require.cache[require.resolve('../shared/submit-lead-core.js')];
  const core = require('../shared/submit-lead-core.js');
  core.resetLandingConfigCache();

  const config = core.loadLandingConfig();
  if (!config || !config['study-french']) {
    console.error('Bundled routing must include valid study-french entry');
    process.exit(1);
  }

  const slugAu = core.resolveLandingSlug({ utm_source_url: 'Australia' });
  if (!slugAu.ok || slugAu.slug !== 'australia') {
    console.error('resolveLandingSlug failed for australia');
    process.exit(1);
  }

  const idsSf = core.resolveCrmIds('study-french');
  if (!idsSf.ok || idsSf.organisation_id !== studyFrench.organisation_id) {
    console.error('resolveCrmIds failed for study-french');
    process.exit(1);
  }

  const unknown = core.resolveCrmIds('unknown-landing');
  if (unknown.ok) {
    console.error('Expected unknown landing to fail');
    process.exit(1);
  }

  const noSlug = core.resolveLandingSlug({});
  if (noSlug.ok) {
    console.error('Expected missing utm_source_url to fail');
    process.exit(1);
  }
}

assertRoutingFileSlugs();
assertRoutingLogic();
console.log(`OK: CRM landing config (${REQUIRED_SLUGS.length} slugs) and routing checks passed.`);
