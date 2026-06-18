#!/bin/sh
set -e

# Generates the admin .htpasswd at container runtime from environment
# variables, so the credentials are never baked into the image layers.
if [ -n "$ADMIN_PASSWORD" ]; then
  printf '%s' "$ADMIN_PASSWORD" | htpasswd -ic /etc/nginx/.htpasswd "${ADMIN_USER:-admin}"
  chown root:nginx /etc/nginx/.htpasswd
  chmod 640 /etc/nginx/.htpasswd
fi
