import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchAllPosts } from './contentful-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya.viilasa.com';
const SITE_NAME = 'Surya Narayan';
const SITE_DESCRIPTION = 'Ideas, lessons, and stories from an indie hacker building SaaS products. Insights on indie hacking, SaaS, startup mindset, and web development.';

const generateRSS = async () => {
    const publicDir = path.join(__dirname, '../public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const allPosts = await fetchAllPosts();
    // Filter out posts missing required fields to avoid invalid RSS entries
    const posts = allPosts.filter(post =>
        post.slug && post.slug !== 'undefined' &&
        post.title && post.title !== 'Untitled' || post.excerpt
    );

    const buildDate = new Date().toUTCString();

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${SITE_NAME} Blog</title>
        <link>${SITE_URL}/blogs</link>
        <description>${SITE_DESCRIPTION}</description>
        <language>en-us</language>
        <lastBuildDate>${buildDate}</lastBuildDate>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        <managingEditor>inbox.suryanarayan@gmail.com (Surya Narayan)</managingEditor>
        <webMaster>inbox.suryanarayan@gmail.com (Surya Narayan)</webMaster>
        <copyright>Copyright ${new Date().getFullYear()} Surya Narayan</copyright>
        <generator>Custom RSS Generator</generator>
        <image>
            <url>https://res.cloudinary.com/ddhhlkyut/image/upload/v1747902976/Hero_2_t6lmp8.png</url>
            <title>${SITE_NAME} Blog</title>
            <link>${SITE_URL}/blogs</link>
        </image>
${posts.map(post => `        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${SITE_URL}/blogs/${post.slug}</link>
            <guid isPermaLink="true">${SITE_URL}/blogs/${post.slug}</guid>
            <description><![CDATA[${post.excerpt}]]></description>
            <content:encoded><![CDATA[${post.plainTextContent.substring(0, 500)}...]]></content:encoded>
            <dc:creator>Surya Narayan</dc:creator>
            <category>${post.category}</category>
            <pubDate>${post.date && !isNaN(new Date(post.date).getTime()) ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
            ${post.image ? `<enclosure url="${post.image}" type="image/jpeg"/>` : ''}
        </item>`).join('\n')}
    </channel>
</rss>`;

    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss.trim());
    console.log(`RSS feed generated: ${posts.length} posts written to public/rss.xml`);
};

generateRSS().catch(console.error);
