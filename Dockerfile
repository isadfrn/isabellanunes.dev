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
RUN printf '%s\n' "${ADMIN_USER}:$(openssl passwd -apr1 "${ADMIN_PASSWORD}")" > /etc/nginx/.htpasswd && \
    chmod 600 /etc/nginx/.htpasswd
EXPOSE 80
