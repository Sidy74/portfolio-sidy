# ===============================================
# STAGE 1: Compilation de l'application Angular
# Utilise Node.js pour installer les dépendances et builder le projet
# ===============================================
FROM node:22-alpine AS build
WORKDIR /app

# Copie les fichiers de gestion de paquets pour profiter de la mise en cache Docker
# Cela évite de retélécharger toutes les dépendances si seul le code source change
COPY package.json package-lock.json* /app/

# Installation des dépendances
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Copie le reste du code source
COPY . /app

# S'assurer que Angular CLI est disponible pour la commande ng build
RUN npx ng version >/dev/null 2>&1 || npm install -D @angular/cli

# Commande de build de l'application Angular pour la production
# (Déclenche le script "prebuild" s'il est défini dans package.json pour le sitemap)
RUN npm run build --if-present || npx ng build --configuration production --output-path=./dist/portfolio-sidy

# ===============================================
# STAGE 2: Environnement d'exécution (Runtime) avec NGINX
# Utilise un serveur Nginx léger pour servir les fichiers statiques
# ===============================================
FROM nginx:alpine AS runtime

# Copie de la configuration Nginx personnalisée pour gérer la canonicalisation (www -> non-www) et le routage Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie les fichiers générés par le stage de build dans le répertoire de service de Nginx
COPY --from=build /app/dist/portfolio-sidy/browser/ /usr/share/nginx/html

# Indique à Coolify quel port le conteneur utilise
EXPOSE 80

# Commande de démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]