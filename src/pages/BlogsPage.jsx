import { Calendar, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getAllPosts, getCategories } from '../utils/blogLoader';
import { useState } from 'react';

// Hero Featured Card - Large prominent display
const HeroCard = ({ post }) => (
    <Link to={`/blogs/${post.slug}`} className="blogs-hero__main hover-lift">
        <div className="blogs-hero__image-wrapper">
            {post.image ? (
                <img src={post.image} alt={post.title} className="blogs-hero__image" />
            ) : (
                <div className="blogs-hero__image-placeholder">
                    <Sparkles size={48} />
                </div>
            )}
            <div className="blogs-hero__overlay" />
        </div>
        <div className="blogs-hero__content">
            <span className="blogs-hero__badge">Latest</span>
            <span className="blogs-hero__category">{post.category}</span>
            <h2 className="blogs-hero__title">{post.title}</h2>
            <p className="blogs-hero__excerpt">{post.excerpt}</p>
            <div className="blogs-hero__meta">
                <span className="blogs-hero__date">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
                {post.readTime && (
                    <span className="blogs-hero__read-time">
                        <Clock size={14} />
                        {post.readTime}
                    </span>
                )}
            </div>
        </div>
    </Link>
);

// Secondary Featured Card - Smaller but still prominent
const SecondaryCard = ({ post, index }) => (
    <Link
        to={`/blogs/${post.slug}`}
        className="blogs-hero__secondary hover-lift"
        style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
        <div className="blogs-hero__secondary-image-wrapper">
            {post.image ? (
                <img src={post.image} alt={post.title} className="blogs-hero__secondary-image" />
            ) : (
                <div className="blogs-hero__secondary-placeholder">
                    <Sparkles size={24} />
                </div>
            )}
        </div>
        <div className="blogs-hero__secondary-content">
            <span className="blogs-hero__secondary-category">{post.category}</span>
            <h3 className="blogs-hero__secondary-title">{post.title}</h3>
            <div className="blogs-hero__secondary-meta">
                <span>
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
                {post.readTime && (
                    <span>
                        <Clock size={12} />
                        {post.readTime}
                    </span>
                )}
            </div>
        </div>
    </Link>
);

// Regular Blog Card
const BlogCard = ({ post, index }) => (
    <Link
        to={`/blogs/${post.slug}`}
        className="blog-card hover-lift"
        style={{ animationDelay: `${index * 0.1}s` }}
    >
        {post.image && (
            <div className="blog-card__thumb">
                <img src={post.image} alt={post.title} />
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
        </div>
    </Link>
);

const BlogsPage = () => {
    const allPosts = getAllPosts();
    const categories = getCategories();
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter all posts by category
    const filteredAllPosts = activeCategory === 'All'
        ? allPosts
        : allPosts.filter(post => post.category === activeCategory);

    // For "All" view: show hero section with top 3, grid with rest
    // For filtered view: show all filtered posts in grid (no hero)
    const showHeroSection = activeCategory === 'All' && allPosts.length > 0;
    const latestPosts = showHeroSection ? allPosts.slice(0, 3) : [];
    const mainHeroPost = latestPosts[0];
    const secondaryPosts = latestPosts.slice(1, 3);

    // Grid posts: remaining posts for "All", or all filtered posts for category
    const gridPosts = activeCategory === 'All'
        ? allPosts.slice(3)
        : filteredAllPosts;

    return (
        <div className="app">
            <SEO
                title="Blog"
                description="Ideas, lessons, and stories from my journey as a builder. Insights on indie hacking, SaaS, startup lessons, and building in public by Surya Narayan."
                url="/blogs"
                keywords="indie hacker blog, SaaS blog, building in public, startup lessons, founder blog, Surya Narayan blog, React developer blog, web development articles"
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Blog", url: "/blogs" }
                ]}
            />
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

                    {/* Category Filters - Always visible */}
                    <div className="blogs-section-header">
                        <h2 className="blogs-section-title">
                            {activeCategory === 'All' ? 'All Articles' : activeCategory}
                        </h2>
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
                    </div>

                    {/* Hero Section - Only shown when "All" is selected */}
                    {showHeroSection && (
                        <section className="blogs-hero">
                            <div className="blogs-hero__grid">
                                {mainHeroPost && <HeroCard post={mainHeroPost} />}
                                <div className="blogs-hero__sidebar">
                                    {secondaryPosts.map((post, idx) => (
                                        <SecondaryCard key={post.slug} post={post} index={idx} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Posts Grid */}
                    {gridPosts.length > 0 ? (
                        <div className="blogs-grid">
                            {gridPosts.map((post, idx) => (
                                <BlogCard key={post.slug} post={post} index={idx} />
                            ))}
                        </div>
                    ) : (
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
