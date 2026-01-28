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
    section
}) => {
    const seoTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const seoDescription = description || 'Indie hacker building SaaS products. Specializing in React, Node.js, and AI-powered solutions.';
    const seoImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE;
    const seoUrl = url ? (url.startsWith('http') ? url : `${SITE_URL}${url}`) : SITE_URL;

    // Generate keywords for articles
    const seoKeywords = keywords || (type === 'article'
        ? `${title}, ${section || 'blog'}, indie hacker, startup, SaaS, building in public, founder mindset, Surya Narayan`
        : 'indie hacker, full-stack developer, SaaS builder, React, Node.js, Surya Narayan');

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />
            <meta name="author" content={author || 'Surya Narayan'} />
            <meta name="robots" content="index, follow, max-image-preview:large" />
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

            {/* JSON-LD Structured Data for Articles */}
            {type === 'article' && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": title,
                        "description": seoDescription,
                        "image": seoImage,
                        "url": seoUrl,
                        "datePublished": publishedTime ? new Date(publishedTime).toISOString() : undefined,
                        "dateModified": modifiedTime ? new Date(modifiedTime).toISOString() : (publishedTime ? new Date(publishedTime).toISOString() : undefined),
                        "author": {
                            "@type": "Person",
                            "name": author || "Surya Narayan",
                            "url": SITE_URL
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
                        }
                    })}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
