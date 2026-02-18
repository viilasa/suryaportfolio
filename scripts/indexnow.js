import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya.viilasa.com';
const API_KEY = '94d3c73163fb40ec8889520adb41bdd0';
const CONTENT_DIR = path.join(__dirname, '../content/blogs');

// Get all blog URLs
function getAllUrls() {
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
    
    const blogUrls = files.map(file => {
        const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
        const { data } = matter(content);
        const slug = data.slug || file.replace('.md', '');
        return `${SITE_URL}/blogs/${slug}`;
    });

    // Static pages
    const staticUrls = [
        SITE_URL,
        `${SITE_URL}/blogs`,
        `${SITE_URL}/portfolios`,
        `${SITE_URL}/things-i-like`,
        `${SITE_URL}/contact`
    ];

    return [...staticUrls, ...blogUrls];
}

// Submit URLs to IndexNow
async function submitToIndexNow() {
    const urls = getAllUrls();
    
    const payload = {
        host: 'surya.viilasa.com',
        key: API_KEY,
        keyLocation: `${SITE_URL}/${API_KEY}.txt`,
        urlList: urls
    };

    console.log(`Submitting ${urls.length} URLs to IndexNow...`);
    
    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 200 || response.status === 202) {
            console.log(`✓ IndexNow: Successfully submitted ${urls.length} URLs`);
            console.log('  Submitted URLs:');
            urls.forEach(url => console.log(`    - ${url}`));
        } else {
            console.log(`IndexNow response: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('IndexNow submission error:', error.message);
    }
}

submitToIndexNow();
