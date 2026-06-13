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
ARG ADMIN_USER=admin
ARG ADMIN_PASSWORD
RUN apk add --no-cache apache2-utils && \
    printf '%s' "${ADMIN_PASSWORD}" | htpasswd -i -c /etc/nginx/.htpasswd "${ADMIN_USER}" && \
    chown root:nginx /etc/nginx/.htpasswd && \
    chmod 640 /etc/nginx/.htpasswd
EXPOSE 80
