#!/bin/sh
set -e
if [ -n "$ADMIN_PASSWORD" ]; then
  printf '%s' "$ADMIN_PASSWORD" | htpasswd -ic /etc/nginx/.htpasswd "${ADMIN_USER:-admin}"
  chown root:nginx /etc/nginx/.htpasswd
  chmod 640 /etc/nginx/.htpasswd
fi
