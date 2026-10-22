/**
 * Shared CRM lead create logic for Netlify Functions and AWS Lambda.
 * Secrets stay in process.env — never ship CRM_API_KEY to the browser.
 */

const { validateLeadContact } = require('./kanan-lead-validation.js');

const DEFAULTS = {
  CRM_LEAD_URL:
    'https://p3uqhxbhjj.us-east-1.awsapprunner.com/api/v1/tenants/5e8f573d-5ff0-4c2a-a44d-e7e3233eb388/workspaces/f58412eb-11b0-4c46-ba14-1c0bb0d9c802/entities/lead',
  CRM_ORGANISATION_ID: 'b0423abb-72d5-48ab-b67e-79834ef878e8',
  CRM_BRANCH_ID: 'c67933e8-f0ab-4078-81aa-50be5dcf1e74',
  CRM_OWNER_ID: 'ec3758dd-6dce-40e7-be28-dcb5c585fdc1',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

/** Function URL CORS + handler ACAO duplicates break browser CORS checks. */
const isLambdaRuntime = Boolean(
  process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.AWS_EXECUTION_ENV
);

/** @type {Record<string, { organisation_id: string, branch_id: string, owner_id: string }> | null | undefined} */
let cachedLandingConfig;

function responseHeaders() {
  if (isLambdaRuntime) {
    return { 'Content-Type': 'application/json' };
  }
  return corsHeaders;
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: responseHeaders(),
    body: JSON.stringify(body),
  };
}

function getHttpMethod(event) {
  return (
    event.httpMethod ||
    event.requestContext?.http?.method ||
    event.requestContext?.httpMethod ||
    ''
  ).toUpperCase();
}

function parseBody(event) {
  let raw = event.body || '{}';
  if (event.isBase64Encoded && typeof raw === 'string') {
    raw = Buffer.from(raw, 'base64').toString('utf8');
  }
  return JSON.parse(raw || '{}');
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const UTM_CONFIG_KEYS = [
  'utm_source',
  'utm_category',
  'utm_campaign',
  'lead_source',
  'utm_source_url',
];

/**
 * @param {unknown} parsed
 * @returns {Record<string, { organisation_id: string, branch_id: string, owner_id: string }>}
 */
function normalizeLandingConfig(parsed) {
  /** @type {Record<string, { organisation_id: string, branch_id: string, owner_id: string }>} */
  const normalized = {};

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return normalized;
  }

  for (const [key, value] of Object.entries(parsed)) {
    const slug = String(key).trim().toLowerCase();
    if (!slug || slug.startsWith('_')) {
      continue;
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      console.error('crm-lead-routing.json invalid entry for slug:', key);
      continue;
    }
    const organisation_id = String(value.organisation_id || '').trim();
    const branch_id = String(value.branch_id || '').trim();
    const owner_id = String(value.owner_id || '').trim();
    if (
      !UUID_RE.test(organisation_id) ||
      !UUID_RE.test(branch_id) ||
      !UUID_RE.test(owner_id)
    ) {
      continue;
    }
    /** @type {{ organisation_id: string, branch_id: string, owner_id: string, utm_source?: string, utm_category?: string, utm_campaign?: string, lead_source?: string, utm_source_url?: string }} */
    const entry = { organisation_id, branch_id, owner_id };
    for (const utmKey of UTM_CONFIG_KEYS) {
      const utmVal = String(value[utmKey] || '').trim();
      if (utmVal) {
        entry[utmKey] = utmVal;
      }
    }
    normalized[slug] = entry;
  }

  return normalized;
}

/**
 * Loads bundled shared/crm-lead-routing.json (shipped with Lambda / Netlify function).
 * @returns {Record<string, { organisation_id: string, branch_id: string, owner_id: string }> | null}
 */
function loadLandingConfig() {
  if (cachedLandingConfig !== undefined) {
    return cachedLandingConfig;
  }

  let parsed;
  try {
    parsed = require('./crm-lead-routing.json');
  } catch (err) {
    console.error('crm-lead-routing.json could not be loaded', err);
    cachedLandingConfig = null;
    return null;
  }

  const normalized = normalizeLandingConfig(parsed);
  if (Object.keys(normalized).length === 0) {
    cachedLandingConfig = null;
    return null;
  }

  cachedLandingConfig = normalized;
  return normalized;
}

/** @internal Test helper */
function resetLandingConfigCache() {
  cachedLandingConfig = undefined;
  try {
    delete require.cache[require.resolve('./crm-lead-routing.json')];
  } catch {
    /* not loaded yet */
  }
}

/**
 * @param {object} data
 * @returns {{ ok: true, slug: string } | { ok: false, error: string }}
 */
function resolveLandingSlug(data) {
  const raw = data.utm_source_url;
  if (raw === undefined || raw === null) {
    return { ok: false, error: 'utm_source_url is required' };
  }
  const slug = String(raw).trim().toLowerCase();
  if (!slug) {
    return { ok: false, error: 'utm_source_url is required' };
  }
  return { ok: true, slug };
}

/**
 * @param {string} slug
 * @returns {{ ok: true, organisation_id: string, branch_id: string, owner_id: string } | { ok: false, error: string, statusCode?: number }}
 */
function resolveCrmIds(slug) {
  const config = loadLandingConfig();

  if (config) {
    const entry = config[slug];
    if (!entry) {
      return {
        ok: false,
        statusCode: 400,
        error: `Unknown landing: ${slug}`,
      };
    }
    return { ok: true, ...entry };
  }

  return {
    ok: true,
    organisation_id:
      process.env.CRM_ORGANISATION_ID || DEFAULTS.CRM_ORGANISATION_ID,
    branch_id: process.env.CRM_BRANCH_ID || DEFAULTS.CRM_BRANCH_ID,
    owner_id: process.env.CRM_OWNER_ID || DEFAULTS.CRM_OWNER_ID,
  };
}

const UTM_DEFAULTS = {
  utm_source: 'Google',
  utm_category: 'paid_lead',
  utm_campaign: 'French_Course_Leads',
  lead_source: 'google',
  utm_source_url: 'study-french',
};

/**
 * @param {object} data
 * @param {string} key
 * @param {Record<string, string>} landingUtm
 */
function optionalUtmField(data, key, landingUtm) {
  const raw = data[key];
  if (raw === undefined || raw === null) {
    return landingUtm[key] ?? UTM_DEFAULTS[key];
  }
  const trimmed = String(raw).trim();
  return trimmed || (landingUtm[key] ?? UTM_DEFAULTS[key]);
}

/**
 * @param {Record<string, string> | undefined} entry
 * @returns {Record<string, string>}
 */
function landingUtmDefaults(entry) {
  if (!entry) {
    return { ...UTM_DEFAULTS };
  }
  return { ...UTM_DEFAULTS, ...pickLandingUtmFields(entry) };
}

/**
 * @param {object} entry
 * @returns {Record<string, string>}
 */
function pickLandingUtmFields(entry) {
  /** @type {Record<string, string>} */
  const utm = {};
  for (const key of UTM_CONFIG_KEYS) {
    const val = entry[key];
    if (val !== undefined && val !== null && String(val).trim()) {
      utm[key] = String(val).trim();
    }
  }
  return utm;
}

async function createLead(data) {
  const apiKey = process.env.CRM_API_KEY;
  if (!apiKey) {
    console.error('CRM_API_KEY is not configured');
    return jsonResponse(500, { error: 'Lead submission is not configured' });
  }

  const name = String(data.name || '').trim();
  let email = String(data.email || '').trim();
  let mobile_number = String(data.mobile_number || '').trim();
  const remarks = String(data.remarks || '').trim();

  if (!name || !email || !mobile_number || !remarks) {
    return jsonResponse(400, {
      error: 'name, email, mobile_number, and remarks are required',
    });
  }

  const contact = validateLeadContact(email, mobile_number);
  if (!contact.ok) {
    return jsonResponse(400, { error: contact.error });
  }
  email = contact.email;
  mobile_number = contact.mobile_number;

  const landingConfig = loadLandingConfig();
  let crmIds;
  /** @type {Record<string, string>} */
  let utmDefaults = { ...UTM_DEFAULTS };

  if (landingConfig) {
    const slugResult = resolveLandingSlug(data);
    if (!slugResult.ok) {
      return jsonResponse(400, { error: slugResult.error });
    }
    const idsResult = resolveCrmIds(slugResult.slug);
    if (!idsResult.ok) {
      return jsonResponse(idsResult.statusCode || 400, { error: idsResult.error });
    }
    crmIds = idsResult;
    utmDefaults = landingUtmDefaults(landingConfig[slugResult.slug]);
  } else {
    crmIds = resolveCrmIds('');
  }

  const payload = {
    organisation_id: crmIds.organisation_id,
    branch_id: crmIds.branch_id,
    owner_id: crmIds.owner_id,
    first_name: name,
    last_name: '-',
    email,
    mobile_number,
    remarks,
    name,
    utm_source: optionalUtmField(data, 'utm_source', utmDefaults),
    utm_category: optionalUtmField(data, 'utm_category', utmDefaults),
    utm_campaign: optionalUtmField(data, 'utm_campaign', utmDefaults),
    lead_source: optionalUtmField(data, 'lead_source', utmDefaults),
    utm_source_url: optionalUtmField(data, 'utm_source_url', utmDefaults),
  };

  const crmUrl = process.env.CRM_LEAD_URL || DEFAULTS.CRM_LEAD_URL;

  try {
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await crmResponse.text();
    let crmBody;
    try {
      crmBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      crmBody = responseText;
    }

    if (!crmResponse.ok) {
      console.error('CRM lead create failed', crmResponse.status, crmBody);
      return jsonResponse(502, {
        error: 'Failed to save lead to CRM',
        status: crmResponse.status,
      });
    }

    return jsonResponse(200, { ok: true, data: crmBody });
  } catch (err) {
    console.error('CRM request error', err);
    return jsonResponse(502, { error: 'Failed to reach CRM' });
  }
}

/**
 * @param {object} event Netlify or Lambda Function URL / API Gateway event
 * @returns {Promise<{statusCode: number, headers: object, body: string}>}
 */
async function handleSubmitLead(event) {
  const method = getHttpMethod(event);

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: responseHeaders(), body: '' };
  }

  if (method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  let data;
  try {
    data = parseBody(event);
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  return createLead(data);
}

module.exports = {
  handleSubmitLead,
  corsHeaders,
  jsonResponse,
  loadLandingConfig,
  normalizeLandingConfig,
  resolveLandingSlug,
  resolveCrmIds,
  resetLandingConfigCache,
};
