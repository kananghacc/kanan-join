# Study French — Direct CRM Lead Submit

Form posts go to a server-side proxy (never put `CRM_API_KEY` in page JavaScript).

## Flow

1. User fills the native form on `/study-french/`
2. Browser POSTs JSON `{ name, email, mobile_number, remarks }`
3. Proxy forwards to the CRM lead API with `x-api-key`
4. On success → `/study-french/thank-you`

## Endpoints

| Platform | Proxy |
| --- | --- |
| **Netlify** | `POST /api/submit-lead` → [`netlify/functions/submit-lead.js`](../netlify/functions/submit-lead.js) |
| **Amplify** | `POST` Lambda Function URL (injected as `CRM_SUBMIT_URL` at build) → [`infrastructure/submit-lead`](../infrastructure/submit-lead) |

Shared CRM logic: [`shared/submit-lead-core.js`](../shared/submit-lead-core.js).

## Netlify env (local `.env` or Netlify dashboard)

```bash
CRM_API_KEY=...
CRM_LEAD_URL=...
CRM_ORGANISATION_ID=...
CRM_BRANCH_ID=...
CRM_OWNER_ID=...
```

```bash
npx netlify dev
```

Do not commit `.env` (gitignored).

## Amplify

See [AMPLIFY_SETUP.md](../AMPLIFY_SETUP.md):

1. Deploy Lambda with CRM secrets (see [AMPLIFY_SETUP.md](../AMPLIFY_SETUP.md))
2. Amplify Hosting env: **`CRM_SUBMIT_URL` only** — remove `CRM_API_KEY` and other CRM_* vars from Amplify
3. Add thank-you rewrites from `amplify-redirects.json`

## Form → CRM field mapping

| Form field | CRM key |
| --- | --- |
| Enter your name | `name`, `first_name` (`last_name` = `-`) |
| Mobile Number | `mobile_number` |
| Enter your Email ID | `email` |
| Educational qualification | `remarks` |

Fixed UTMs: `utm_source=Google`, `utm_category=paid_lead`, `utm_campaign=French_Course_Leads`, `lead_source=Google`, `utm_source_url=study-french`.
