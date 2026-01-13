# ===============================================
# STAGE 1: Compilation
# ===============================================
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* /app/
RUN npm ci --no-audit --no-fund

COPY . /app

# We explicitly disable SSR and Prerendering to avoid the 'bootstrap' null error
RUN npx ng build --configuration production \
    --output-path=dist/portfolio-sidy \
    --ssr false \
    --prerender false

# ===============================================
# STAGE 2: Runtime (NGINX)
# ===============================================
FROM nginx:alpine AS runtime

# Note: In Angular 21 with SSR disabled, files are usually placed 
# directly in the output folder (not inside a /browser subfolder).
COPY --from=build /app/dist/portfolio-sidy/ /usr/share/nginx/html

# Standard Nginx port
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]