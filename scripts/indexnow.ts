import 'dotenv/config';
import { fetchAllPosts } from './contentful-client';

const SITE_URL = 'https://surya.viilasa.com';
const API_KEY = process.env.INDEXNOW_API_KEY || '94d3c73163fb40ec8889520adb41bdd0';

// Get all blog URLs
async function getAllUrls(): Promise<string[]> {
    const posts = await fetchAllPosts();

    const blogUrls = posts
        .filter(post => post.slug && post.slug !== 'undefined')
        .map(post => `${SITE_URL}/blogs/${post.slug}`);

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
    const urls = await getAllUrls();

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
            console.log(`IndexNow: Successfully submitted ${urls.length} URLs`);
            console.log('  Submitted URLs:');
            urls.forEach(url => console.log(`    - ${url}`));
        } else {
            console.log(`IndexNow response: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('IndexNow submission error:', (error as Error).message);
    }
}

submitToIndexNow();
