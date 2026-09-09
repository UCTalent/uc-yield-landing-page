#!/usr/bin/env bash
set -euo pipefail

: "${SERVICE:?SERVICE required}"
: "${IMAGE:?IMAGE required}"
: "${ENV_FILE:?ENV_FILE required}"
: "${ROUTER_URL:?ROUTER_URL required}"
: "${ROUTER_TOKEN:?ROUTER_TOKEN required}"

missing_pkgs=()
command -v curl >/dev/null 2>&1 || missing_pkgs+=(curl)
command -v python3 >/dev/null 2>&1 || missing_pkgs+=(python3)
if [ ${#missing_pkgs[@]} -gt 0 ]; then
  apt-get update -qq
  apt-get install -y -q "${missing_pkgs[@]}" >/dev/null
fi

curl -fsSL https://tailscale.com/install.sh | sh
tailscaled --state=mem: >/tmp/tailscaled.log 2>&1 &
sleep 5
tailscale up \
  --authkey="${TAILSCALE_AUTHKEY:?TAILSCALE_AUTHKEY required}" \
  --accept-routes \
  --hostname="cloudbuild-router-$(date +%s)" \
  --timeout=90s

tailscale_ready=0
for _ in $(seq 1 30); do
  if tailscale ip -4 >/dev/null 2>&1; then
    tailscale_ready=1
    break
  fi
  sleep 2
done
[ "$tailscale_ready" -eq 1 ] || { echo "[ERROR] tailscale failed"; exit 1; }

python3 - "$IMAGE" "$ENV_FILE" <<'PY'
import json
import os
import sys

image, env_file = sys.argv[1], sys.argv[2]
env = {}
with open(env_file, encoding='utf-8') as file:
    for line in file:
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        env[key.strip()] = value.strip()

with open('/tmp/payload.json', 'w', encoding='utf-8') as file:
    json.dump({
        'service': os.environ['SERVICE'],
        'image': image,
        'env': env,
        'files': {},
    }, file)
PY

http_code=$(curl -sS -o /tmp/deploy-response.json -w "%{http_code}" --max-time 900 \
  -X POST "$ROUTER_URL/deploy" \
  -H "Authorization: Bearer $ROUTER_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary @/tmp/payload.json) || {
  echo "[ERROR] cannot reach deploy-router at $ROUTER_URL"
  exit 1
}

cat /tmp/deploy-response.json
echo
[ "$http_code" = "200" ] || {
  echo "[ERROR] deploy-router returned HTTP $http_code"
  exit 1
}
