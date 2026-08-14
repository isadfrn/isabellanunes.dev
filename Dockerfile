FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY generate-htpasswd.sh /docker-entrypoint.d/40-generate-htpasswd.sh
RUN apk add --no-cache apache2-utils && \
    chmod +x /docker-entrypoint.d/40-generate-htpasswd.sh
EXPOSE 80
