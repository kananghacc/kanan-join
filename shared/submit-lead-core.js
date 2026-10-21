/**
 * Shared CRM lead create logic for Netlify Functions and AWS Lambda.
 * Secrets stay in process.env — never ship CRM_API_KEY to the browser.
 */

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

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
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

const UTM_DEFAULTS = {
  utm_source: 'Google',
  utm_category: 'paid_lead',
  utm_campaign: 'French_Course_Leads',
  lead_source: 'Google',
  utm_source_url: 'study-french',
};

function optionalUtmField(data, key) {
  const raw = data[key];
  if (raw === undefined || raw === null) {
    return UTM_DEFAULTS[key];
  }
  const trimmed = String(raw).trim();
  return trimmed || UTM_DEFAULTS[key];
}

async function createLead(data) {
  const apiKey = process.env.CRM_API_KEY;
  if (!apiKey) {
    console.error('CRM_API_KEY is not configured');
    return jsonResponse(500, { error: 'Lead submission is not configured' });
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const mobile_number = String(data.mobile_number || '').trim();
  const remarks = String(data.remarks || '').trim();

  if (!name || !email || !mobile_number || !remarks) {
    return jsonResponse(400, {
      error: 'name, email, mobile_number, and remarks are required',
    });
  }

  const payload = {
    organisation_id:
      process.env.CRM_ORGANISATION_ID || DEFAULTS.CRM_ORGANISATION_ID,
    branch_id: process.env.CRM_BRANCH_ID || DEFAULTS.CRM_BRANCH_ID,
    owner_id: process.env.CRM_OWNER_ID || DEFAULTS.CRM_OWNER_ID,
    first_name: name,
    last_name: '-',
    email,
    mobile_number,
    remarks,
    name,
    utm_source: optionalUtmField(data, 'utm_source'),
    utm_category: optionalUtmField(data, 'utm_category'),
    utm_campaign: optionalUtmField(data, 'utm_campaign'),
    lead_source: optionalUtmField(data, 'lead_source'),
    utm_source_url: optionalUtmField(data, 'utm_source_url'),
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
    return { statusCode: 204, headers: corsHeaders, body: '' };
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
};
