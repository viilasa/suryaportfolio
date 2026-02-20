// Blog post metadata for OG tags + GEO structured data
const blogPosts = {
    'youre-not-early-youre-just-hiding': {
        title: "You're Not Early. You're Just Hiding.",
        description: "Most founders aren't early. They're scared. And 'early' becomes the safest excuse to stay invisible while momentum slowly dies.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1769621614/penguin_jlljzc.png',
        date: '2026-01-28',
        category: 'Founder Mindset',
        readTime: '8 min read',
        keywords: 'founder mindset, startup advice, product launch, shipping, indie hacker, building in public'
    },
    'saas-bloated-afraid-to-say-no': {
        title: "Your SaaS Is Bloated Because You're Afraid to Say No",
        description: "Discover why SaaS feature bloat drives user churn and how 'purposeful subtraction' can save your product. Learn to overcome the founder fear that leads to complex, confusing software.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1768686551/saas_is_bloated_lxysfk.png',
        date: '2026-01-18',
        category: 'SaaS',
        readTime: '7 min read',
        keywords: 'SaaS bloat, feature creep, product management, saying no, SaaS founder advice'
    },
    'building-proofedge': {
        title: 'Building ProofEdge: From Idea to Product',
        description: 'The journey of building a social proof SaaS from scratch, including the challenges faced and lessons learned.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        date: '2026-01-08',
        category: 'Building',
        readTime: '5 min read',
        keywords: 'building SaaS, social proof, ProofEdge, indie hacker, product development, React, Node.js'
    },
    'indie-hacker-lessons': {
        title: '5 Lessons from My First Year as an Indie Hacker',
        description: 'Reflecting on a year of building products, making mistakes, and learning what really matters.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
        date: '2026-01-05',
        category: 'Lessons',
        readTime: '4 min read',
        keywords: 'indie hacker lessons, startup lessons, building products, distribution, consistency'
    },
    'why-react': {
        title: 'Why I Chose React Over Other Frameworks',
        description: 'A deep dive into why React remains my frontend framework of choice — ecosystem, job market, and compounding learning.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
        date: '2025-12-20',
        category: 'Tech',
        readTime: '6 min read',
        keywords: 'React vs Vue, React vs Svelte, frontend framework comparison, JavaScript frameworks'
    },
    'your-website-is-lying-to-every-visitor': {
        title: 'Your Website Is Lying to Every Visitor Who Lands on It',
        description: "Most websites are graveyards. People show up, look around for 8 seconds, and leave. Your visitors don't trust you — not because your product is bad, but because your site doesn't speak the language of social proof.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1771440557/laptop_nvrlsb.png',
        date: '2026-02-19',
        category: 'Growth',
        readTime: '10 min read',
        keywords: 'social proof, conversion optimization, website trust, social proof widgets, ProofEdge, CRO, trust signals, landing page optimization, bounce rate reduction, SaaS growth'
    },
    'social-proof-widgets-complete-guide': {
        title: 'What Are Social Proof Widgets? The Complete Guide to Boosting Website Conversions in 2025',
        description: 'Learn what social proof widgets are, why they matter for your website, the 7 types that drive conversions, and how to set them up the right way. Includes stats, examples, and tool recommendations.',
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1771441415/social_prof_widget_h2s7ap.png',
        date: '2026-02-19',
        category: 'Growth',
        readTime: '12 min read',
        keywords: 'social proof widgets, website conversion optimization, FOMO marketing, purchase notifications, live visitor counter, review widgets, ProofEdge, conversion rate optimization, trust signals'
    },
    'vibe-coders-make-money': {
        title: "Why 99% of Vibe Coders Will Never Make a Dollar (And What the 1% Do Differently)",
        description: "Everyone's building. Nobody's selling. The vibe coding wave made building trivially easy — and that's exactly the problem. Here's what separates the 1% who actually make money from the 99% who don't.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1771536074/edwards_ol6rn4.png',
        date: '2026-02-20',
        category: 'Founder Mindset',
        readTime: '6 min read',
        keywords: 'vibe coding, AI coding, make money coding, indie hacker, solopreneur, distribution, building products, AI tools, cursor AI, selling software, startup advice'
    }
};

export const config = {
    matcher: '/blogs/:path*',
};

export default function middleware(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';

    // Check if it's a social media crawler or AI bot
    const isCrawler = /twitterbot|facebookexternalhit|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|Googlebot|bingbot|GPTBot|ChatGPT-User|anthropic-ai|ClaudeBot|PerplexityBot|Bytespider|CCBot|YouBot|Amazonbot|Google-Extended/i.test(userAgent);

    if (!isCrawler) {
        return; // Let normal request proceed to SPA
    }

    // Extract slug from URL path
    const pathParts = url.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    if (!slug || slug === 'blogs' || slug === '') {
        return; // Not a blog post page, let it proceed
    }

    const post = blogPosts[slug];

    if (!post) {
        return; // Unknown blog post, let SPA handle it
    }

    const siteUrl = 'https://surya.viilasa.com';
    const fullUrl = `${siteUrl}/blogs/${slug}`;

    // JSON-LD structured data for AI crawlers (GEO)
    const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": { "@type": "ImageObject", "url": post.image, "width": 1200, "height": 630 },
        "url": fullUrl,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
        "author": {
            "@type": "Person",
            "name": "Surya Narayan",
            "url": siteUrl,
            "sameAs": ["https://x.com/lrdsurya", "https://www.linkedin.com/in/surya-narayan-51a0a0119/"]
        },
        "publisher": { "@type": "Person", "name": "Surya Narayan", "url": siteUrl },
        "mainEntityOfPage": { "@type": "WebPage", "@id": fullUrl },
        "articleSection": post.category,
        "keywords": post.keywords,
        "inLanguage": "en-US",
        "isAccessibleForFree": true
    });

    const breadcrumbLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blogs` },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": fullUrl }
        ]
    });

    // Return HTML with proper meta tags for crawlers
    const html = `<!DOCTYPE html>
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
    <meta property="article:tag" content="${post.keywords}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@lrdsurya">
    <meta name="twitter:creator" content="@lrdsurya">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.description}">
    <meta name="twitter:image" content="${post.image}">
    <meta name="twitter:image:alt" content="${post.title}">
    
    <link rel="canonical" href="${fullUrl}">

    <!-- JSON-LD Structured Data for AI/GEO -->
    <script type="application/ld+json">${jsonLd}</script>
    <script type="application/ld+json">${breadcrumbLd}</script>
</head>
<body>
    <article>
        <h1>${post.title}</h1>
        <p><strong>By Surya Narayan</strong> | ${post.date} | ${post.readTime} | ${post.category}</p>
        <p>${post.description}</p>
        <p>Read the full article at <a href="${fullUrl}">${fullUrl}</a></p>
    </article>
</body>
</html>`;

    return new Response(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
        }
    });
}
