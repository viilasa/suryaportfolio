// Vercel Edge Function for OG tags on blog posts
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
        description: "Discover why SaaS feature bloat drives user churn and how 'purposeful subtraction' can save your product.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1768686551/saas_is_bloated_lxysfk.png',
        date: '2026-01-18',
        category: 'Product',
        readTime: '5 min read',
        keywords: 'SaaS bloat, feature creep, product management, saying no'
    },
    'building-proofedge': {
        title: 'Building ProofEdge: From Idea to Product',
        description: 'The journey of building a social proof SaaS from scratch, including the challenges faced and lessons learned.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        date: '2026-01-08',
        category: 'Building',
        readTime: '5 min read',
        keywords: 'building SaaS, social proof, ProofEdge, indie hacker'
    },
    'indie-hacker-lessons': {
        title: '5 Lessons from My First Year as an Indie Hacker',
        description: 'Reflecting on a year of building products, making mistakes, and learning what really matters.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
        date: '2026-01-05',
        category: 'Lessons',
        readTime: '4 min read',
        keywords: 'indie hacker lessons, startup lessons, building products'
    },
    'why-react': {
        title: 'Why I Chose React Over Other Frameworks',
        description: 'A deep dive into why React remains my frontend framework of choice.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
        date: '2025-12-20',
        category: 'Tech',
        readTime: '6 min read',
        keywords: 'React, frontend framework, JavaScript'
    },
    'your-website-is-lying-to-every-visitor': {
        title: 'Your Website Is Lying to Every Visitor Who Lands on It',
        description: "Most websites are graveyards. Your visitors don't trust you because your site doesn't speak the language of social proof.",
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1771440557/laptop_nvrlsb.png',
        date: '2026-02-19',
        category: 'Growth',
        readTime: '10 min read',
        keywords: 'social proof, conversion optimization, website trust'
    },
    'social-proof-widgets-complete-guide': {
        title: 'What Are Social Proof Widgets? The Complete Guide to Boosting Website Conversions in 2025',
        description: 'Learn what social proof widgets are, why they matter, the 7 types that drive conversions, and how to set them up.',
        image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1771441415/social_prof_widget_h2s7ap.png',
        date: '2026-02-19',
        category: 'Growth',
        readTime: '12 min read',
        keywords: 'social proof widgets, conversion optimization, FOMO'
    }
};

export const config = {
    runtime: 'edge',
};

export default function handler(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';
    
    // Extract slug from query or path
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
        return new Response('Missing slug', { status: 400 });
    }

    const post = blogPosts[slug];
    
    if (!post) {
        return new Response('Post not found', { status: 404 });
    }

    const siteUrl = 'https://surya.viilasa.com';
    const fullUrl = `${siteUrl}/blogs/${slug}`;

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
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@lrdsurya">
    <meta name="twitter:creator" content="@lrdsurya">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.description}">
    <meta name="twitter:image" content="${post.image}">
    <meta name="twitter:image:alt" content="${post.title}">
    
    <link rel="canonical" href="${fullUrl}">
    
    <!-- Redirect to actual page for browsers -->
    <meta http-equiv="refresh" content="0;url=${fullUrl}">
</head>
<body>
    <h1>${post.title}</h1>
    <p>${post.description}</p>
    <p>Redirecting to <a href="${fullUrl}">${fullUrl}</a>...</p>
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
