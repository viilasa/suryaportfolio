import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya.viilasa.com';

const today = new Date().toISOString().split('T')[0];

const generateSitemap = async () => {
    const contentDir = path.join(__dirname, '../content/blogs');
    const publicDir = path.join(__dirname, '../public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

    // Static pages — all site pages with correct URLs
    const pages = [
        { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
        { url: '/blogs', changefreq: 'daily', priority: 0.9, lastmod: today },
        { url: '/portfolios', changefreq: 'weekly', priority: 0.8, lastmod: today },
        { url: '/things-i-like', changefreq: 'monthly', priority: 0.7, lastmod: today },
        { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: today },
    ];

    // Blog posts — auto-discovered from markdown files
    const posts = files.map(file => {
        const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
        const { data } = matter(fileContent);
        return {
            url: `/blogs/${data.slug || file.replace('.md', '')}`,
            changefreq: 'monthly',
            priority: data.featured ? 0.8 : 0.7,
            lastmod: data.date || today
        };
    });

    // Sort posts by date descending
    posts.sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));

    const allUrls = [...pages, ...posts];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `    <url>
        <loc>${SITE_URL}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        <lastmod>${page.lastmod}</lastmod>
    </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap.trim());
    console.log(`Sitemap generated: ${allUrls.length} URLs written to public/sitemap.xml`);
};

generateSitemap().catch(console.error);
