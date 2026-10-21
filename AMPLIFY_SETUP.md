# Deploy on AWS Amplify (+ Lambda for CRM)

Static pages deploy on **Amplify Hosting**. The CRM API key must live on a **Lambda** (not in the browser).

## 1. Deploy the submit-lead Lambda

```bash
cd infrastructure/submit-lead

# Keep src/submit-lead-core.js in sync with shared/submit-lead-core.js
cp ../../shared/submit-lead-core.js src/submit-lead-core.js

sam build
sam deploy --guided \
  --parameter-overrides CrmApiKey="YOUR_CRM_API_KEY"
```

After deploy, copy the stack output **`SubmitLeadFunctionUrl`** (looks like `https://xxxx.lambda-url.region.on.aws/`).

Lambda environment variables (set via SAM parameters):

| Variable | Required |
| --- | --- |
| `CRM_API_KEY` | Yes |
| `CRM_LEAD_URL` | Optional (has default) |
| `CRM_ORGANISATION_ID` | Optional |
| `CRM_BRANCH_ID` | Optional |
| `CRM_OWNER_ID` | Optional |

## 2. Connect the repo to Amplify Hosting

1. Amplify Console → Create app → Host web app → connect [kananghacc/kanan-join](https://github.com/kananghacc/kanan-join) (or your fork).
2. Amplify will pick up [`amplify.yml`](amplify.yml) (`./build.sh` → publish `dist/`).
3. **Hosting → Environment variables** — use **only** `CRM_SUBMIT_URL` on Amplify:

| Action | Variable |
| --- | --- |
| **Remove** (if present) | `CRM_API_KEY`, `CRM_LEAD_URL`, `CRM_ORGANISATION_ID`, `CRM_BRANCH_ID`, `CRM_OWNER_ID` |
| **Set** (all branches) | `CRM_SUBMIT_URL` = Lambda Function URL from step 1 |

`CRM_SUBMIT_URL` is public (not a secret). CRM credentials stay on **Lambda** only.

**CLI (BrainValley / Amplify account):** add `AMPLIFY_APP_ID` to `.env`, then:

```bash
chmod +x scripts/apply-amplify-crm-env.sh
./scripts/apply-amplify-crm-env.sh
```

Default region `us-east-1`, branch `main` — override with `AMPLIFY_REGION` / `AMPLIFY_BRANCH`.

4. Import redirects from [`amplify-redirects.json`](amplify-redirects.json):  
   **Hosting → Rewrites and redirects** → add the thank-you `200` rules (especially `/study-french/thank-you` → `/study-french/thank-you.html`).

5. Redeploy so `amplify.yml` injects `CRM_SUBMIT_URL` into `dist/study-french/index.html`.

## 3. How the form chooses the endpoint

| Host | Submit URL |
| --- | --- |
| Amplify (with `CRM_SUBMIT_URL` set) | Lambda Function URL |
| Netlify / `netlify dev` | `/api/submit-lead` → Netlify Function |
| Static open / no proxy | `/api/submit-lead` will fail |

## 4. Local Netlify (unchanged)

`.env` at repo root with `CRM_API_KEY=...` then:

```bash
npx netlify dev
```

See [study-french/CRM_SETUP.md](study-french/CRM_SETUP.md).
