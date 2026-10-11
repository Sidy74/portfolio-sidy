const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://sidydiarra.com'; // Ton domaine
const today = new Date().toISOString().split('T')[0]; // Date du jour automatique

// La liste de tes sections/pages
const routes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '#services', priority: '0.8', changefreq: 'monthly' },
  { path: '#projects', priority: '0.9', changefreq: 'weekly' },
  { path: '#contact', priority: '0.7', changefreq: 'yearly' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${DOMAIN}/${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// S'assure que le dossier public/ existe, puis écrit sitemap.xml dedans
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log('✅ Sitemap généré automatiquement !');