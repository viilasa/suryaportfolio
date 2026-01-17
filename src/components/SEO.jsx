import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from '../utils/constants';

const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author
}) => {
    const seoTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const seoDescription = description || 'Personal portfolio and blog of Surya.';
    const seoImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/default-og.png`;
    const seoUrl = url ? (url.startsWith('http') ? url : `${SITE_URL}${url}`) : SITE_URL;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <link rel="canonical" href={seoUrl} />

            {/* Open Graph Tags */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:type" content={type} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />

            {/* Article Specific Tags */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}
        </Helmet>
    );
};

export default SEO;
