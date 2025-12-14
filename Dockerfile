# ---- Build ----
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm ci

# Copia el resto del proyecto y compila
COPY . .
RUN npm run build

# ---- Run (Nginx) ----
FROM nginx:alpine

# Config SPA (Angular routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el build (Angular 17+ suele dejarlo en dist/<proyecto>/browser)
# Esto es robusto: copia el "browser" si existe, si no copia lo que haya.
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /tmp/dist
RUN set -eux; \
    if [ -d /tmp/dist/*/browser ]; then \
      cp -r /tmp/dist/*/browser/* /usr/share/nginx/html/; \
    else \
      cp -r /tmp/dist/* /usr/share/nginx/html/; \
    fi; \
    rm -rf /tmp/dist

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
