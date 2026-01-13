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
RUN npm run build --if-present || npx ng build --configuration production --output-path=./dist/portfolio-sidy

# ===============================================
# STAGE 2: Environnement d'exécution (Runtime) avec NGINX
# Utilise un serveur Nginx léger pour servir les fichiers statiques
# ===============================================
FROM nginx:alpine AS runtime

# Optionnel: Si vous avez un fichier nginx.conf personnalisé, décommentez la ligne ci-dessous
# et assurez-vous que le fichier nginx.conf est à la racine de votre projet Git.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie les fichiers générés par le stage de build dans le répertoire de service de Nginx
# Assurez-vous que le chemin /app/dist/portfolio-sidy correspond au chemin réel !
COPY --from=build /app/dist/portfolio-sidy/browser/ /usr/share/nginx/html

# Indique à Coolify quel port le conteneur utilise
EXPOSE 80

# Commande de démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
