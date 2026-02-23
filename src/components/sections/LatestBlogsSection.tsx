import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useAllPosts } from '../../hooks/useBlog';

const LatestBlogsSection = () => {
    const { posts, loading } = useAllPosts();
    const latestPosts = posts.slice(0, 3);

    return (
        <section className="latest-blogs">
            <div className="latest-blogs__container">
                <div className="latest-blogs__header">
                    <SectionHeading subtitle="From the Blog">
                        Latest Thoughts
                    </SectionHeading>
                    <Link to="/blogs" className="latest-blogs__view-all">
                        View All Posts <ArrowRight size={16} />
                    </Link>
                </div>

                {loading && (
                    <div className="blogs-loading">
                        <div className="loading-spinner" />
                        <p>Loading posts...</p>
                    </div>
                )}

                <div className="latest-blogs__grid">
                    {latestPosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            to={`/blogs/${post.slug}`}
                            className="latest-blogs__card hover-lift"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {post.image && (
                                <div className="latest-blogs__image">
                                    <img src={post.image} alt={post.title} />
                                </div>
                            )}
                            <div className="latest-blogs__content">
                                <span className="latest-blogs__category">{post.category}</span>
                                <h3 className="latest-blogs__title">{post.title}</h3>
                                <p className="latest-blogs__excerpt">{post.excerpt}</p>
                                {post.keywords && (
                                    <div className="blog-tags blog-tags--sm">
                                        <Tag size={10} />
                                        {post.keywords.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3).map(tag => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="latest-blogs__meta">
                                    <span>
                                        <Calendar size={14} />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    {post.readTime && (
                                        <span>
                                            <Clock size={14} />
                                            {post.readTime}
                                        </span>
                                    )}
                                </div>
                                <span className="latest-blogs__cta">
                                    Read Article <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogsSection;
