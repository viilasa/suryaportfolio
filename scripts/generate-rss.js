import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya.viilasa.com';
const SITE_NAME = 'Surya Narayan';
const SITE_DESCRIPTION = 'Ideas, lessons, and stories from an indie hacker building SaaS products. Insights on indie hacking, SaaS, startup mindset, and web development.';

const generateRSS = async () => {
    const contentDir = path.join(__dirname, '../content/blogs');
    const publicDir = path.join(__dirname, '../public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

    const posts = files.map(file => {
        const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
        const { data, content } = matter(fileContent);
        return {
            title: data.title,
            slug: data.slug || file.replace('.md', ''),
            description: data.excerpt || '',
            date: data.date,
            category: data.category || 'General',
            author: data.author || 'Surya Narayan',
            image: data.image || '',
            keywords: data.keywords || '',
            content: content.substring(0, 500) + '...'
        };
    });

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

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
            <description><![CDATA[${post.description}]]></description>
            <content:encoded><![CDATA[${post.content}]]></content:encoded>
            <dc:creator>Surya Narayan</dc:creator>
            <category>${post.category}</category>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            ${post.image ? `<enclosure url="${post.image}" type="image/jpeg"/>` : ''}
        </item>`).join('\n')}
    </channel>
</rss>`;

    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss.trim());
    console.log(`RSS feed generated: ${posts.length} posts written to public/rss.xml`);
};

generateRSS().catch(console.error);
