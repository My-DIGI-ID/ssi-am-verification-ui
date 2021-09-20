#!/usr/bin/env sh

set -eu

envsubst < /usr/share/nginx/html/assets/config/keycloak-config.prod.json > /usr/share/nginx/html/assets/config/config.json

exec "$@"