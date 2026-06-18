# Stage 1: build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# The .htpasswd is generated at runtime (see generate-htpasswd.sh) from the
# ADMIN_USER/ADMIN_PASSWORD env vars, keeping credentials out of image layers.
COPY generate-htpasswd.sh /docker-entrypoint.d/40-generate-htpasswd.sh
RUN apk add --no-cache apache2-utils && \
    chmod +x /docker-entrypoint.d/40-generate-htpasswd.sh
EXPOSE 80
