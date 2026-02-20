import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://surya.viilasa.com';
const CONTENT_DIR = path.join(__dirname, '../content/blogs');
const DIST_DIR = path.join(__dirname, '../dist/og');

// Read all markdown files and extract frontmatter
function getAllPosts() {
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
    
    return files.map(file => {
        const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
        const { data } = matter(content);
        return {
            slug: data.slug || file.replace('.md', ''),
            title: data.title,
            description: data.excerpt,
            image: data.image,
            date: data.date,
            category: data.category,
            readTime: data.readTime,
            keywords: data.keywords || ''
        };
    });
}

// Generate HTML with OG tags for each blog post
function generateOGPage(post) {
    const fullUrl = `${SITE_URL}/blogs/${post.slug}`;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Surya Narayan</title>
    <meta name="description" content="${post.description}">
    <meta name="keywords" content="${post.keywords}">
    <meta name="author" content="Surya Narayan">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    
    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${fullUrl}">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.description}">
    <meta property="og:image" content="${post.image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${post.title}">
    <meta property="og:site_name" content="Surya Narayan">
    <meta property="og:locale" content="en_US">
    <meta property="article:published_time" content="${post.date}">
    <meta property="article:author" content="Surya Narayan">
    <meta property="article:section" content="${post.category}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@lrdsurya">
    <meta name="twitter:creator" content="@lrdsurya">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.description}">
    <meta name="twitter:image" content="${post.image}">
    <meta name="twitter:image:alt" content="${post.title}">
    
    <link rel="canonical" href="${fullUrl}">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image}",
        "url": "${fullUrl}",
        "datePublished": "${post.date}",
        "author": {
            "@type": "Person",
            "name": "Surya Narayan",
            "url": "${SITE_URL}"
        }
    }
    </script>
    
    <!-- SPA redirect script -->
    <script>
        // Redirect browsers to the SPA, but crawlers get the meta tags above
        (function() {
            var defined = 'onload' in window;
            if (defined) {
                // Check if it's a real browser (not a crawler)
                var ua = navigator.userAgent.toLowerCase();
                var isCrawler = /bot|crawl|spider|facebook|twitter|linkedin|slack|discord|telegram|whatsapp/i.test(ua);
                if (!isCrawler) {
                    // Load the SPA
                    window.location.replace('${fullUrl}');
                }
            }
        })();
    </script>
</head>
<body>
    <article>
        <h1>${post.title}</h1>
        <p><strong>By Surya Narayan</strong> | ${post.date} | ${post.readTime || ''}</p>
        <img src="${post.image}" alt="${post.title}" style="max-width:100%;">
        <p>${post.description}</p>
        <p><a href="${fullUrl}">Read the full article →</a></p>
    </article>
</body>
</html>`;
}

// Main
function main() {
    const posts = getAllPosts();
    
    // Ensure dist/blogs directory exists
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }
    
    // Generate HTML for each post
    posts.forEach(post => {
        const html = generateOGPage(post);
        const filePath = path.join(DIST_DIR, `${post.slug}.html`);
        fs.writeFileSync(filePath, html);
    });
    
    console.log(`OG pages generated: ${posts.length} blog HTML files created in dist/blogs/`);
}

main();
