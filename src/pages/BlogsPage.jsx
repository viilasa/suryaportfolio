import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllPosts, getCategories } from '../utils/blogLoader';
import { useState } from 'react';

const BlogCard = ({ post, index, featured = false }) => (
    <Link
        to={`/blogs/${post.slug}`}
        className={`blog-card hover-lift ${featured ? 'blog-card--featured' : ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
    >
        {featured && post.image && (
            <div className="blog-card__image-wrapper">
                <img src={post.image} alt={post.title} className="blog-card__image" />
            </div>
        )}
        <div className="blog-card__content">
            <div className="blog-card__category">{post.category}</div>
            <h3 className="blog-card__title">{post.title}</h3>
            <p className="blog-card__excerpt">{post.excerpt}</p>
            <div className="blog-card__meta">
                <span className="blog-card__date">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
                {post.readTime && (
                    <span className="blog-card__read-time">
                        <Clock size={14} />
                        {post.readTime}
                    </span>
                )}
            </div>
            <span className="blog-card__link">
                Read More <ArrowRight size={16} />
            </span>
        </div>
    </Link>
);

const BlogsPage = () => {
    const allPosts = getAllPosts();
    const categories = getCategories();
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? allPosts
        : allPosts.filter(post => post.category === activeCategory);

    const featuredPost = allPosts.find(post => post.featured);

    return (
        <div className="app">
            <Navbar />
            <main className="page blogs-page">
                {/* Decorative elements */}
                <div className="floating-orb floating-orb--1"></div>
                <div className="floating-orb floating-orb--2"></div>
                <div className="grid-pattern"></div>

                <div className="page__container">
                    <div className="page__header">
                        <SectionHeading subtitle="Thoughts & Learnings">
                            Blog
                        </SectionHeading>
                        <p className="page__description">
                            Ideas, lessons, and stories from my journey as a builder.
                        </p>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="blogs-featured">
                            <span className="blogs-featured__label">Featured Post</span>
                            <BlogCard post={featuredPost} index={0} featured={true} />
                        </div>
                    )}

                    {/* Category Filter */}
                    <div className="blogs-filters">
                        <button
                            className={`blogs-filter ${activeCategory === 'All' ? 'blogs-filter--active' : ''}`}
                            onClick={() => setActiveCategory('All')}
                        >
                            All
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`blogs-filter ${activeCategory === category ? 'blogs-filter--active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Posts Grid */}
                    <div className="blogs-grid">
                        {filteredPosts
                            .filter(post => !post.featured || activeCategory !== 'All')
                            .map((post, idx) => (
                                <BlogCard key={post.slug} post={post} index={idx} />
                            ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="blogs-empty">
                            <p>No posts in this category yet.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogsPage;
