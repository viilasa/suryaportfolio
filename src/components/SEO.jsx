import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, TWITTER_HANDLE, DEFAULT_IMAGE } from '../utils/constants';

const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    keywords,
    section,
    breadcrumbs,
    faqItems,
    wordCount,
    tags
}) => {
    const seoTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const seoDescription = description || 'Indie hacker building SaaS products. Specializing in React, Node.js, and AI-powered solutions.';
    const seoImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE;
    const seoUrl = url ? (url.startsWith('http') ? url : `${SITE_URL}${url}`) : SITE_URL;

    // Generate keywords for articles
    const seoKeywords = keywords || (type === 'article'
        ? `${title}, ${section || 'blog'}, indie hacker, startup, SaaS, building in public, founder mindset, Surya Narayan`
        : 'indie hacker, full-stack developer, SaaS builder, React, Node.js, Surya Narayan');

    // BreadcrumbList structured data for GEO
    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`
        }))
    } : null;

    // FAQPage structured data for GEO — AI engines love extracting Q&A
    const faqSchema = faqItems && faqItems.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    // Enhanced Article structured data with GEO signals
    const articleSchema = type === 'article' ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": seoDescription,
        "image": {
            "@type": "ImageObject",
            "url": seoImage,
            "width": 1200,
            "height": 630
        },
        "url": seoUrl,
        "datePublished": publishedTime ? new Date(publishedTime).toISOString() : undefined,
        "dateModified": modifiedTime ? new Date(modifiedTime).toISOString() : (publishedTime ? new Date(publishedTime).toISOString() : undefined),
        "author": {
            "@type": "Person",
            "name": author || "Surya Narayan",
            "url": SITE_URL,
            "sameAs": [
                "https://x.com/lrdsurya",
                "https://www.linkedin.com/in/surya-narayan-51a0a0119/",
                "https://www.instagram.com/itsuryav/"
            ]
        },
        "publisher": {
            "@type": "Person",
            "name": "Surya Narayan",
            "url": SITE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": DEFAULT_IMAGE
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": seoUrl
        },
        "articleSection": section || "Technology",
        "inLanguage": "en-US",
        ...(wordCount ? { "wordCount": wordCount } : {}),
        ...(tags ? { "keywords": tags } : {}),
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".blog-post__title", ".blog-post__excerpt", ".blog-post__content h2", ".blog-post__content p"]
        },
        "isAccessibleForFree": true
    } : null;

    // WebPage structured data for non-article pages
    const webPageSchema = type !== 'article' ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": seoTitle,
        "description": seoDescription,
        "url": seoUrl,
        "image": seoImage,
        "inLanguage": "en-US",
        "isPartOf": {
            "@type": "WebSite",
            "name": SITE_NAME,
            "url": SITE_URL
        },
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "h2", ".page__description"]
        }
    } : null;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />
            <meta name="author" content={author || 'Surya Narayan'} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link rel="canonical" href={seoUrl} />

            {/* Open Graph Tags - Optimized for Facebook & LinkedIn */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title || SITE_NAME} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title || 'Surya Narayan Blog'} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card Tags - Optimized for Twitter/X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={title || SITE_NAME} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:image:alt" content={title || 'Surya Narayan Blog'} />

            {/* LinkedIn Specific Tags */}
            <meta name="linkedin:card" content="summary_large_image" />

            {/* Article Specific Tags */}
            {type === 'article' && (
                <>
                    <meta property="article:author" content={author || 'Surya Narayan'} />
                    <meta property="article:section" content={section || 'Technology'} />
                </>
            )}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={new Date(publishedTime).toISOString()} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={new Date(modifiedTime).toISOString()} />
            )}
            {type === 'article' && tags && (
                <meta property="article:tag" content={tags} />
            )}

            {/* JSON-LD: Article / BlogPosting (GEO-enhanced) */}
            {articleSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            )}

            {/* JSON-LD: WebPage for non-article pages */}
            {webPageSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(webPageSchema)}
                </script>
            )}

            {/* JSON-LD: BreadcrumbList for navigation context */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}

            {/* JSON-LD: FAQPage for AI-extractable Q&A */}
            {faqSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
