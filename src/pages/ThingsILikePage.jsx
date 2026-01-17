<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Wrench, Headphones, Sparkles, Film, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import thingsILikeData from '../data/thingsILike.json';

const iconMap = {
    BookOpen,
    Wrench,
    Headphones,
    Sparkles,
    Film
};

// Component to fetch movies from Letterboxd RSS
const LetterboxdSection = ({ section }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchLetterboxdMovies = async () => {
            try {
                // Use allorigins.win as CORS proxy (more reliable)
                const rssUrl = `https://letterboxd.com/${section.letterboxdUsername}/rss/`;
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

                const response = await fetch(proxyUrl);
                const xmlText = await response.text();

                // Parse XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');

                if (items.length > 0) {
                    const parsedMovies = Array.from(items).slice(0, 10).map((item, index) => {
                        const title = item.querySelector('title')?.textContent || '';
                        const link = item.querySelector('link')?.textContent || '';
                        const description = item.querySelector('description')?.textContent || '';
                        const pubDate = item.querySelector('pubDate')?.textContent || '';

                        // Extract image from description HTML
                        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
                        let image = imgMatch ? imgMatch[1] : '';
                        // Try to get higher resolution image
                        image = image.replace('0-150-0-225', '0-500-0-750');

                        // Extract rating if available
                        const ratingMatch = title.match(/★+½?/);
                        const rating = ratingMatch ? ratingMatch[0] : '';

                        // Clean title (remove rating)
                        const cleanTitle = title.replace(/\s*-\s*★+½?.*$/, '').replace(/,\s*\d{4}$/, '').trim();

                        return {
                            id: index,
                            title: cleanTitle,
                            subtitle: rating || 'Watched',
                            note: pubDate ? new Date(pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                            image: image,
                            link: link
                        };
                    });

                    setMovies(parsedMovies);
                } else {
                    // Fallback to static items
                    setMovies(section.items || []);
                }
            } catch (err) {
                console.error('Error fetching Letterboxd:', err);
                // Fallback to static items
                setMovies(section.items || []);
                setError('Using cached movies');
            } finally {
                setLoading(false);
            }
        };

        fetchLetterboxdMovies();
    }, [section.letterboxdUsername, section.items]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="likes-section" id={section.id}>
            <div className="likes-section__header">
                <div className="likes-section__title-row">
                    <div className="likes-section__icon">
                        <Film size={24} />
                    </div>
                    <h2 className="likes-section__title">{section.name}</h2>
                    <span className="likes-section__live-badge">LIVE</span>
                </div>
                <div className="likes-section__controls">
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="likes-section__scroll-wrapper">
                {loading ? (
                    <div className="likes-section__loading">
                        <Loader2 size={32} className="likes-section__spinner" />
                        <span>Loading from Letterboxd...</span>
                    </div>
                ) : (
                    <div className="likes-section__scroll" ref={scrollRef}>
                        {movies.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="likes-card likes-card--movies"
                            >
                                <div className="likes-card__image-wrapper">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="likes-card__image"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/200x300/18181b/71717a?text=${encodeURIComponent(item.title)}`;
                                        }}
                                    />
                                    <div className="likes-card__overlay"></div>
                                </div>
                                <div className="likes-card__content">
                                    <h3 className="likes-card__title">{item.title}</h3>
                                    <span className="likes-card__subtitle">{item.subtitle}</span>
                                    <p className="likes-card__note">{item.note}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                <div className="likes-section__fade likes-section__fade--left"></div>
                <div className="likes-section__fade likes-section__fade--right"></div>
            </div>

            {/* Letterboxd links */}
            <div className="likes-section__letterboxd">
                <a
                    href={section.letterboxdListUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="likes-section__letterboxd-link"
                >
                    <Film size={16} />
                    View my favorites list →
                </a>
                {section.letterboxdProfileUrl && (
                    <a
                        href={section.letterboxdProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="likes-section__letterboxd-profile"
                    >
                        @{section.letterboxdUsername}
                    </a>
                )}
            </div>
        </section>
    );
};

const HorizontalScrollSection = ({ section }) => {
    const scrollRef = useRef(null);
    const IconComponent = iconMap[section.iconName] || Sparkles;

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="likes-section" id={section.id}>
            <div className="likes-section__header">
                <div className="likes-section__title-row">
                    <div className="likes-section__icon">
                        <IconComponent size={24} />
                    </div>
                    <h2 className="likes-section__title">{section.name}</h2>
                </div>
                <div className="likes-section__controls">
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="likes-section__scroll-wrapper">
                <div className="likes-section__scroll" ref={scrollRef}>
                    {section.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`likes-card likes-card--${section.id}`}
                        >
                            <div className="likes-card__image-wrapper">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="likes-card__image"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/300x400/18181b/71717a?text=${encodeURIComponent(item.title)}`;
                                    }}
                                />
                                <div className="likes-card__overlay"></div>
                            </div>
                            <div className="likes-card__content">
                                <h3 className="likes-card__title">{item.title}</h3>
                                <span className="likes-card__subtitle">{item.subtitle}</span>
                                <p className="likes-card__note">{item.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="likes-section__fade likes-section__fade--left"></div>
                <div className="likes-section__fade likes-section__fade--right"></div>
            </div>
        </section>
    );
};

const ThingsILikePage = () => {
    return (
        <div className="app">
            <Navbar />
            <main className="page likes-page likes-page--horizontal">
                {/* Decorative elements */}
                <div className="floating-orb floating-orb--1"></div>
                <div className="floating-orb floating-orb--3"></div>

                <div className="page__container">
                    <div className="page__header">
                        <SectionHeading subtitle={thingsILikeData.pageSubtitle}>
                            {thingsILikeData.pageTitle}
                        </SectionHeading>
                        <p className="page__description">{thingsILikeData.description}</p>
                    </div>
                </div>

                <div className="likes-sections">
                    {thingsILikeData.sections.map((section) => (
                        section.id === 'movies' ? (
                            <LetterboxdSection key={section.id} section={section} />
                        ) : (
                            <HorizontalScrollSection key={section.id} section={section} />
                        )
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThingsILikePage;
=======
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Wrench, Headphones, Sparkles, Film, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import thingsILikeData from '../data/thingsILike.json';

const iconMap = {
    BookOpen,
    Wrench,
    Headphones,
    Sparkles,
    Film
};

// Component to fetch movies from Letterboxd RSS
const LetterboxdSection = ({ section }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchLetterboxdMovies = async () => {
            try {
                // Use allorigins.win as CORS proxy (more reliable)
                const rssUrl = `https://letterboxd.com/${section.letterboxdUsername}/rss/`;
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

                const response = await fetch(proxyUrl);
                const xmlText = await response.text();

                // Parse XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');

                if (items.length > 0) {
                    const parsedMovies = Array.from(items).slice(0, 10).map((item, index) => {
                        const title = item.querySelector('title')?.textContent || '';
                        const link = item.querySelector('link')?.textContent || '';
                        const description = item.querySelector('description')?.textContent || '';
                        const pubDate = item.querySelector('pubDate')?.textContent || '';

                        // Extract image from description HTML
                        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
                        let image = imgMatch ? imgMatch[1] : '';
                        // Try to get higher resolution image
                        image = image.replace('0-150-0-225', '0-500-0-750');

                        // Extract rating if available
                        const ratingMatch = title.match(/★+½?/);
                        const rating = ratingMatch ? ratingMatch[0] : '';

                        // Clean title (remove rating)
                        const cleanTitle = title.replace(/\s*-\s*★+½?.*$/, '').replace(/,\s*\d{4}$/, '').trim();

                        return {
                            id: index,
                            title: cleanTitle,
                            subtitle: rating || 'Watched',
                            note: pubDate ? new Date(pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                            image: image,
                            link: link
                        };
                    });

                    setMovies(parsedMovies);
                } else {
                    // Fallback to static items
                    setMovies(section.items || []);
                }
            } catch (err) {
                console.error('Error fetching Letterboxd:', err);
                // Fallback to static items
                setMovies(section.items || []);
                setError('Using cached movies');
            } finally {
                setLoading(false);
            }
        };

        fetchLetterboxdMovies();
    }, [section.letterboxdUsername, section.items]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="likes-section" id={section.id}>
            <div className="likes-section__header">
                <div className="likes-section__title-row">
                    <div className="likes-section__icon">
                        <Film size={24} />
                    </div>
                    <h2 className="likes-section__title">{section.name}</h2>
                    <span className="likes-section__live-badge">LIVE</span>
                </div>
                <div className="likes-section__controls">
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="likes-section__scroll-wrapper">
                {loading ? (
                    <div className="likes-section__loading">
                        <Loader2 size={32} className="likes-section__spinner" />
                        <span>Loading from Letterboxd...</span>
                    </div>
                ) : (
                    <div className="likes-section__scroll" ref={scrollRef}>
                        {movies.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="likes-card likes-card--movies"
                            >
                                <div className="likes-card__image-wrapper">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="likes-card__image"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/200x300/18181b/71717a?text=${encodeURIComponent(item.title)}`;
                                        }}
                                    />
                                    <div className="likes-card__overlay"></div>
                                </div>
                                <div className="likes-card__content">
                                    <h3 className="likes-card__title">{item.title}</h3>
                                    <span className="likes-card__subtitle">{item.subtitle}</span>
                                    <p className="likes-card__note">{item.note}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                <div className="likes-section__fade likes-section__fade--left"></div>
                <div className="likes-section__fade likes-section__fade--right"></div>
            </div>

            {/* Letterboxd links */}
            <div className="likes-section__letterboxd">
                <a
                    href={section.letterboxdListUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="likes-section__letterboxd-link"
                >
                    <Film size={16} />
                    View my favorites list →
                </a>
                {section.letterboxdProfileUrl && (
                    <a
                        href={section.letterboxdProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="likes-section__letterboxd-profile"
                    >
                        @{section.letterboxdUsername}
                    </a>
                )}
            </div>
        </section>
    );
};

const HorizontalScrollSection = ({ section }) => {
    const scrollRef = useRef(null);
    const IconComponent = iconMap[section.iconName] || Sparkles;

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="likes-section" id={section.id}>
            <div className="likes-section__header">
                <div className="likes-section__title-row">
                    <div className="likes-section__icon">
                        <IconComponent size={24} />
                    </div>
                    <h2 className="likes-section__title">{section.name}</h2>
                </div>
                <div className="likes-section__controls">
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="likes-section__btn"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="likes-section__scroll-wrapper">
                <div className="likes-section__scroll" ref={scrollRef}>
                    {section.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`likes-card likes-card--${section.id}`}
                        >
                            <div className="likes-card__image-wrapper">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="likes-card__image"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/300x400/18181b/71717a?text=${encodeURIComponent(item.title)}`;
                                    }}
                                />
                                <div className="likes-card__overlay"></div>
                            </div>
                            <div className="likes-card__content">
                                <h3 className="likes-card__title">{item.title}</h3>
                                <span className="likes-card__subtitle">{item.subtitle}</span>
                                <p className="likes-card__note">{item.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="likes-section__fade likes-section__fade--left"></div>
                <div className="likes-section__fade likes-section__fade--right"></div>
            </div>
        </section>
    );
};

const ThingsILikePage = () => {
    return (
        <div className="app">
            <Navbar />
            <main className="page likes-page likes-page--horizontal">
                {/* Decorative elements */}
                <div className="floating-orb floating-orb--1"></div>
                <div className="floating-orb floating-orb--3"></div>

                <div className="page__container">
                    <div className="page__header">
                        <SectionHeading subtitle={thingsILikeData.pageSubtitle}>
                            {thingsILikeData.pageTitle}
                        </SectionHeading>
                        <p className="page__description">{thingsILikeData.description}</p>
                    </div>
                </div>

                <div className="likes-sections">
                    {thingsILikeData.sections.map((section) => (
                        section.id === 'movies' ? (
                            <LetterboxdSection key={section.id} section={section} />
                        ) : (
                            <HorizontalScrollSection key={section.id} section={section} />
                        )
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThingsILikePage;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
