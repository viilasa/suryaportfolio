import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import type { Block, Inline } from '@contentful/rich-text-types';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { usePostBySlug, useAllPosts } from '../hooks/useBlog';

const richTextOptions = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: React.ReactNode) => (
            <p>{children}</p>
        ),
        [BLOCKS.HEADING_2]: (_node: Block | Inline, children: React.ReactNode) => (
            <h2>{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (_node: Block | Inline, children: React.ReactNode) => (
            <h3>{children}</h3>
        ),
        [BLOCKS.HEADING_4]: (_node: Block | Inline, children: React.ReactNode) => (
            <h4>{children}</h4>
        ),
        [BLOCKS.UL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
            <ul>{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
            <ol>{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: React.ReactNode) => (
            <li>{children}</li>
        ),
        [BLOCKS.QUOTE]: (_node: Block | Inline, children: React.ReactNode) => (
            <blockquote>{children}</blockquote>
        ),
        [BLOCKS.HR]: () => <hr />,
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
            const { title, file } = (node.data?.target?.fields ?? {}) as {
                title?: string;
                file?: { url: string };
            };
            if (!file?.url) return null;
            return (
                <img
                    src={file.url.startsWith('//') ? `https:${file.url}` : file.url}
                    alt={title || ''}
                    className="blog-post__inline-image"
                />
            );
        },
        [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
            <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
    },
};

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { post, loading } = usePostBySlug(slug || '');
    const { posts: allPosts } = useAllPosts();

    // Scroll to top when navigating to a new blog post
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Get related posts (same category, excluding current)
    const relatedPosts = allPosts
        .filter(p => p.category === post?.category && p.slug !== slug)
        .slice(0, 2);

    if (loading) {
        return (
            <div className="app">
                <Navbar />
                <main className="page blog-post-page">
                    <div className="page__container">
                        <div className="blogs-loading">
                            <div className="loading-spinner" />
                            <p>Loading post...</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="app">
                <Navbar />
                <main className="page blog-post-page">
                    <div className="page__container">
                        <div className="blog-post__not-found">
                            <h1>Post not found</h1>
                            <p>The blog post you're looking for doesn't exist.</p>
                            <Link to="/blogs" className="btn btn--primary">
                                <ArrowLeft size={16} /> Back to Blogs
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Word count for structured data — extract plain text from Rich Text
    const postWordCount = post.content
        ? documentToPlainTextString(post.content).split(/\s+/).length
        : 0;

    return (
        <div className="app">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.image}
                url={`/blogs/${post.slug}`}
                type="article"
                publishedTime={post.date}
                author={post.author || "Surya Narayan"}
                section={post.category}
                keywords={post.keywords}
                wordCount={postWordCount}
                tags={post.keywords || `${post.category}, indie hacker, Surya Narayan`}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Blog", url: "/blogs" },
                    { name: post.title, url: `/blogs/${post.slug}` }
                ]}
                faqItems={post.faqItems}
            />
            <Navbar />
            <main className="page blog-post-page">
                {/* Decorative elements */}
                <div className="floating-orb floating-orb--1"></div>
                <div className="floating-orb floating-orb--3"></div>

                <article className="blog-post">
                    {/* Back link */}
                    <div className="blog-post__back">
                        <Link to="/blogs" className="blog-post__back-link">
                            <ArrowLeft size={16} /> All Posts
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="blog-post__header">
                        <div className="blog-post__meta">
                            <span className="blog-post__category">
                                <Tag size={14} /> {post.category}
                            </span>
                            <span className="blog-post__date">
                                <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            {post.readTime && (
                                <span className="blog-post__read-time">
                                    <Clock size={14} /> {post.readTime}
                                </span>
                            )}
                        </div>
                        <h1 className="blog-post__title">{post.title}</h1>
                        {post.excerpt && (
                            <p className="blog-post__excerpt">{post.excerpt}</p>
                        )}
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="blog-post__image-wrapper">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="blog-post__image"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="blog-post__content prose">
                        {documentToReactComponents(post.content, richTextOptions)}
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="blog-post__related">
                            <h3 className="blog-post__related-title">Related Posts</h3>
                            <div className="blog-post__related-grid">
                                {relatedPosts.map(related => (
                                    <Link
                                        key={related.slug}
                                        to={`/blogs/${related.slug}`}
                                        className="blog-post__related-card"
                                    >
                                        {related.image && (
                                            <div className="blog-post__related-image">
                                                <img src={related.image} alt={related.title} />
                                            </div>
                                        )}
                                        <div className="blog-post__related-content">
                                            <span className="blog-post__related-category">{related.category}</span>
                                            <h4>{related.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPostPage;
