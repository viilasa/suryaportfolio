import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya-portfolio.com'; // Match this with src/utils/constants.js

const generateSitemap = async () => {
    const contentDir = path.join(__dirname, '../content/blogs');
    const publicDir = path.join(__dirname, '../public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

    // Static pages
    const pages = [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/blogs', changefreq: 'daily', priority: 0.8 },
        // Add other static pages here if needed
    ];

    // Blog posts
    const posts = files.map(file => {
        const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
        const { data } = matter(fileContent);
        return {
            url: `/blogs/${data.slug || file.replace('.md', '')}`,
            changefreq: 'monthly',
            priority: 0.6,
            lastmod: data.date
        };
    });

    const allUrls = [...pages, ...posts];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls.map(page => `
    <url>
        <loc>${SITE_URL}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    </url>
    `).join('')}
</urlset>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap().catch(console.error);
