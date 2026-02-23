import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchAllPosts } from './contentful-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya.viilasa.com';

const today = new Date().toISOString().split('T')[0];

interface SitemapEntry {
    url: string;
    changefreq: string;
    priority: number;
    lastmod: string;
}

const generateSitemap = async () => {
    const publicDir = path.join(__dirname, '../public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const blogPosts = await fetchAllPosts();

    // Static pages — all site pages with correct URLs
    const pages: SitemapEntry[] = [
        { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
        { url: '/blogs', changefreq: 'daily', priority: 0.9, lastmod: today },
        { url: '/portfolios', changefreq: 'weekly', priority: 0.8, lastmod: today },
        { url: '/things-i-like', changefreq: 'monthly', priority: 0.7, lastmod: today },
        { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: today },
    ];

    // Blog posts — from Contentful (skip any with invalid slugs)
    const posts: SitemapEntry[] = blogPosts
        .filter(post => post.slug && post.slug !== 'undefined')
        .map(post => ({
            url: `/blogs/${post.slug}`,
            changefreq: 'monthly',
            priority: post.featured ? 0.8 : 0.7,
            lastmod: post.date && !isNaN(new Date(post.date).getTime()) ? new Date(post.date).toISOString().split('T')[0] : today
        }));

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
