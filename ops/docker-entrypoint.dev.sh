#!/usr/bin/env sh

set -eu

envsubst < /opt/ssi-am-verification-ui/src/assets/config/config.template.json > /opt/ssi-am-verification-ui/src/assets/config/config.json

exec "$@"
