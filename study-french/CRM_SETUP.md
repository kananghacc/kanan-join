# Study French — Direct CRM Lead Submit

Form posts go to a server-side proxy (never put `CRM_API_KEY` in page JavaScript).

## Flow

1. User fills the native form on `/study-french/`
2. Browser POSTs JSON with contact fields and `utm_source_url=study-french`
3. Proxy resolves `organisation_id`, `branch_id`, `owner_id` from bundled [`shared/crm-lead-routing.json`](../shared/crm-lead-routing.json) and forwards to the CRM lead API with `x-api-key`
4. On success → `/study-french/thank-you`

## Endpoints

| Platform | Proxy |
| --- | --- |
| **Netlify** | `POST /api/submit-lead` → [`netlify/functions/submit-lead.js`](../netlify/functions/submit-lead.js) |
| **Amplify** | `POST` Lambda Function URL (injected as `CRM_SUBMIT_URL` at build) → [`infrastructure/submit-lead`](../infrastructure/submit-lead) |

Shared CRM logic: [`shared/submit-lead-core.js`](../shared/submit-lead-core.js).

## Per-landing CRM IDs

Edit **[`shared/crm-lead-routing.json`](../shared/crm-lead-routing.json)** in the repo (one object per `utm_source_url` slug). Redeploy the Lambda after changes so the updated JSON is bundled (`cp` into `infrastructure/submit-lead/src/` before `sam deploy` — see [AMPLIFY_SETUP.md](../AMPLIFY_SETUP.md)).

## Netlify env (local `.env` or Netlify dashboard)

```bash
CRM_API_KEY=...
CRM_LEAD_URL=...   # optional
```

```bash
npx netlify dev
```

Do not commit `.env` (gitignored).

## Amplify

See [AMPLIFY_SETUP.md](../AMPLIFY_SETUP.md):

1. Deploy Lambda with `CRM_API_KEY` (routing JSON ships in the function code)
2. Amplify Hosting env: **`CRM_SUBMIT_URL` only**
3. Add thank-you rewrites from `amplify-redirects.json`

## Form → CRM field mapping

| Form field | CRM key |
| --- | --- |
| Enter your name | `name`, `first_name` (`last_name` = `-`) |
| Mobile Number | `mobile_number` |
| Enter your Email ID | `email` |
| Educational qualification | `remarks` |

UTMs sent with the POST: `utm_source=Google`, `utm_category=paid_lead`, `utm_campaign=French_Course_Leads`, `lead_source=Google`, `utm_source_url=study-french`.
