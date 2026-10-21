# Study French — Direct CRM Lead Submit

The landing page posts leads to the CRM via a Netlify Function instead of Tally/Pabbly.

## Flow

1. User fills the native form on `/study-french/`
2. Browser `POST`s to `/api/submit-lead`
3. Netlify function [`netlify/functions/submit-lead.js`](../netlify/functions/submit-lead.js) forwards to the CRM lead API with `x-api-key`
4. On success, user is redirected to `/study-french/thank-you`

## Required Netlify environment variable

Set this in the Netlify site settings (**Site configuration → Environment variables**):

| Variable | Required | Description |
| --- | --- | --- |
| `CRM_API_KEY` | Yes | Value for the CRM `x-api-key` header |

### Optional overrides

Defaults match the French Course Canada Pabbly workflow. Override only if the CRM IDs change:

| Variable | Default purpose |
| --- | --- |
| `CRM_LEAD_URL` | Full CRM lead `POST` URL |
| `CRM_ORGANISATION_ID` | `organisation_id` in payload |
| `CRM_BRANCH_ID` | `branch_id` in payload |
| `CRM_OWNER_ID` | `owner_id` in payload |

## Local testing

Create a `.env` at the repo root (gitignored) with:

```bash
CRM_API_KEY=...
CRM_LEAD_URL=...
CRM_ORGANISATION_ID=...
CRM_BRANCH_ID=...
CRM_OWNER_ID=...
```

Then:

```bash
npx netlify dev
```

Netlify CLI loads `.env` automatically for functions. Do not commit `.env`.

## Form → CRM field mapping

| Form field | CRM key |
| --- | --- |
| Enter your name | `name`, `first_name` (`last_name` = `-`) |
| Mobile Number | `mobile_number` |
| Enter your Email ID | `email` |
| Educational qualification | `remarks` |

Fixed UTM fields: `utm_source=Google`, `utm_category=paid_lead`, `utm_campaign=French_Course_Leads`, `lead_source=Google`, `utm_source_url=study-french`.
