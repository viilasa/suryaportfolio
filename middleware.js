// Blog post metadata for OG tags
const blogPosts = {
    'youre-not-early-youre-just-hiding': {
        title: "You're Not Early. You're Just Hiding.",
        description: "Most founders aren't early. They're scared. And 'early' becomes the safest excuse to stay invisible while momentum slowly dies.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1769621614/penguin_jlljzc.png',
        date: '2026-01-28'
    },
    'saas-bloated-afraid-to-say-no': {
        title: "Your SaaS Is Bloated Because You're Afraid to Say No",
        description: "Feature bloat kills products. Learn why saying no is the most important skill for SaaS founders.",
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
        date: '2026-01-18'
    },
    'building-proofedge': {
        title: 'Building ProofEdge: From Idea to Product',
        description: 'The journey of building a social proof SaaS from scratch, including the challenges faced and lessons learned.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        date: '2026-01-08'
    },
    'indie-hacker-lessons': {
        title: '5 Lessons from My First Year as an Indie Hacker',
        description: 'Key lessons learned from building products independently.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
        date: '2026-01-05'
    },
    'why-react': {
        title: 'Why I Choose React in 2024',
        description: 'My thoughts on React and why it remains my go-to framework.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
        date: '2025-12-20'
    }
};

export const config = {
    matcher: '/blogs/:path*',
};

export default function middleware(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';

    // Check if it's a social media crawler
    const isCrawler = /twitterbot|facebookexternalhit|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|Googlebot/i.test(userAgent);

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

    const siteUrl = 'https://suryaportfolio-omega.vercel.app';
    const fullUrl = `${siteUrl}/blogs/${slug}`;

    // Return HTML with proper meta tags for crawlers
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Surya Narayan</title>
    <meta name="description" content="${post.description}">
    
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
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@lrdsurya">
    <meta name="twitter:creator" content="@lrdsurya">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.description}">
    <meta name="twitter:image" content="${post.image}">
    <meta name="twitter:image:alt" content="${post.title}">
    
    <link rel="canonical" href="${fullUrl}">
</head>
<body>
    <h1>${post.title}</h1>
    <p>${post.description}</p>
    <p>Read this article at <a href="${fullUrl}">${fullUrl}</a></p>
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
