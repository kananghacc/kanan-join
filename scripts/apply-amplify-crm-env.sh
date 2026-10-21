#!/usr/bin/env bash
# Apply Amplify Hosting CRM env: keep CRM_SUBMIT_URL only, remove CRM secrets, redeploy.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ROOT/.env"
  set +a
fi

CRM_SUBMIT_URL="${CRM_SUBMIT_URL:-}"
AMPLIFY_APP_ID="${AMPLIFY_APP_ID:-}"
AMPLIFY_REGION="${AMPLIFY_REGION:-us-east-1}"
AMPLIFY_BRANCH="${AMPLIFY_BRANCH:-main}"

REMOVE=(CRM_API_KEY CRM_LEAD_URL CRM_ORGANISATION_ID CRM_BRANCH_ID CRM_OWNER_ID)

if [[ -z "$CRM_SUBMIT_URL" ]]; then
  echo "Missing CRM_SUBMIT_URL. Set it in $ROOT/.env (Lambda Function URL)."
  exit 1
fi

if [[ -z "$AMPLIFY_APP_ID" ]]; then
  echo "Missing AMPLIFY_APP_ID."
  echo "Find it in Amplify console URL: .../amplify/home#/dXXXXXXXXXXXX/..."
  echo "Then add AMPLIFY_APP_ID=dXXXXXXXXXXXX to .env or export it."
  exit 1
fi

merge_env() {
  local current_json="$1"
  python3 - "$current_json" "$CRM_SUBMIT_URL" "${REMOVE[@]}" <<'PY'
import json, sys
current = json.loads(sys.argv[1] or "{}")
url = sys.argv[2]
remove = set(sys.argv[3:])
for key in remove:
    current.pop(key, None)
current["CRM_SUBMIT_URL"] = url
print(json.dumps(current))
PY
}

echo "Fetching app environment variables (app $AMPLIFY_APP_ID, region $AMPLIFY_REGION)..."
APP_ENV=$(aws amplify get-app --app-id "$AMPLIFY_APP_ID" --region "$AMPLIFY_REGION" \
  --query 'app.environmentVariables' --output json)
NEW_APP_ENV=$(merge_env "$APP_ENV")

echo "Updating app env (removed: ${REMOVE[*]}; set CRM_SUBMIT_URL)."
aws amplify update-app --app-id "$AMPLIFY_APP_ID" --region "$AMPLIFY_REGION" \
  --environment-variables "$NEW_APP_ENV" >/dev/null

echo "Updating branch overrides (if any)..."
while IFS= read -r branch; do
  [[ -z "$branch" ]] && continue
  BENV=$(aws amplify get-branch --app-id "$AMPLIFY_APP_ID" --branch-name "$branch" \
    --region "$AMPLIFY_REGION" --query 'branch.environmentVariables' --output json)
  if [[ "$BENV" != "null" && "$BENV" != "{}" ]]; then
    NEW_BENV=$(merge_env "$BENV")
    aws amplify update-branch --app-id "$AMPLIFY_APP_ID" --branch-name "$branch" \
      --region "$AMPLIFY_REGION" --environment-variables "$NEW_BENV" >/dev/null
    echo "  branch $branch: updated"
  fi
done < <(aws amplify list-branches --app-id "$AMPLIFY_APP_ID" --region "$AMPLIFY_REGION" \
  --query 'branches[].branchName' --output text | tr '\t' '\n')

echo "Starting Amplify build for branch $AMPLIFY_BRANCH..."
JOB=$(aws amplify start-job --app-id "$AMPLIFY_APP_ID" --branch-name "$AMPLIFY_BRANCH" \
  --region "$AMPLIFY_REGION" --job-type RELEASE --query 'jobSummary.jobId' --output text)
echo "Done. Job ID: $JOB"
echo "CRM_SUBMIT_URL will be injected into dist/study-french/index.html on build (see amplify.yml)."
