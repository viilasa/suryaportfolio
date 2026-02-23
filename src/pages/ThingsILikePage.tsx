import { useRef } from 'react';
import { BookOpen, Wrench, Headphones, Sparkles, Film, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import thingsILikeData from '../data/thingsILike.json';
import type { ThingsSection } from '../types';

const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Wrench,
    Headphones,
    Sparkles,
    Film
};

const HorizontalScrollSection = ({ section }: { section: ThingsSection }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const IconComponent = iconMap[section.iconName] || Sparkles;

    const scroll = (direction: 'left' | 'right') => {
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
                                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400/18181b/71717a?text=${encodeURIComponent(item.title)}`;
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
            <SEO
                title="Things I Like"
                description="Books, tools, music, and movies that inspire Surya Narayan. A curated collection of favorites from an indie hacker and full-stack developer."
                url="/things-i-like"
                keywords="Surya Narayan favorites, developer tools, indie hacker resources, books for developers, developer inspiration, curated recommendations"
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Things I Like", url: "/things-i-like" }
                ]}
            />
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
                        <HorizontalScrollSection key={section.id} section={section} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThingsILikePage;
