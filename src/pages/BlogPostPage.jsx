import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getPostBySlug, getAllPosts } from '../utils/blogLoader';

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = getPostBySlug(slug);
    const allPosts = getAllPosts();

    // Get related posts (same category, excluding current)
    const relatedPosts = allPosts
        .filter(p => p.category === post?.category && p.slug !== slug)
        .slice(0, 2);

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

    // Word count for structured data
    const postWordCount = post.content ? post.content.split(/\s+/).length : 0;

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
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Custom code block styling
                                code({ node, inline, className, children, ...props }) {
                                    return inline ? (
                                        <code className="inline-code" {...props}>{children}</code>
                                    ) : (
                                        <pre className="code-block">
                                            <code className={className} {...props}>{children}</code>
                                        </pre>
                                    );
                                },
                                // Custom link styling
                                a({ node, children, ...props }) {
                                    return (
                                        <a {...props} target="_blank" rel="noopener noreferrer">
                                            {children}
                                        </a>
                                    );
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
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
                                        <span className="blog-post__related-category">{related.category}</span>
                                        <h4>{related.title}</h4>
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
