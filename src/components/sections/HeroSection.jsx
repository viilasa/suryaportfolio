import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../../data/content.json';

const HeroSection = () => {
    const { hero } = content;

    return (
        <section className="hero">
            {/* Decorative floating orbs */}
            <div className="floating-orb floating-orb--1"></div>
            <div className="floating-orb floating-orb--2"></div>

            {/* Grid pattern background */}
            <div className="grid-pattern"></div>

            {/* Decorative dots */}
            <div className="dots-pattern" style={{ top: '20%', right: '15%' }}></div>
            <div className="dots-pattern" style={{ bottom: '30%', left: '5%' }}></div>

            <div className="hero__container">
                <div className="hero__badge glow-badge animate-fade-in">
                    <span className="hero__badge-dot"></span>
                    {hero.statusBadge}
                </div>
                <h1 className="hero__headline animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    {hero.headline.line1}<br />
                    {hero.headline.line2}<span className="hero__headline-dash">-</span>{hero.headline.line2Suffix}
                </h1>
                <p className="hero__description animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {hero.description}
                </p>
                <div className="hero__buttons animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <Link to={hero.buttons.primary.href} className="hero__btn hero__btn--primary">
                        {hero.buttons.primary.label}
                        <ArrowUpRight size={20} className="hero__btn-icon" />
                    </Link>
                    <Link to={hero.buttons.secondary.href} className="hero__btn hero__btn--secondary">
                        {hero.buttons.secondary.label}
                    </Link>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-text">
                    <span className="hero__scroll-text-rotated">{hero.scrollText}</span>
                    <div className="hero__scroll-line animate-float"></div>
                </div>
            </div>

            {/* Decorative geometric shapes */}
            <div className="hero__shapes">
                <div className="hero__shape hero__shape--circle"></div>
                <div className="hero__shape hero__shape--ring"></div>
                <div className="hero__shape hero__shape--square"></div>
            </div>

            {/* Profile Photo with Arrow */}
            <div className="hero__profile animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="hero__profile-annotation">
                    <span className="hero__profile-label">This is me posing<br />for the picture →</span>
                </div>
                <div className="hero__profile-image-wrapper animate-float">
                    <img
                        src="https://res.cloudinary.com/ddhhlkyut/image/upload/v1767828566/me_surya_blog_lrpxln.jpg"
                        alt="Surya Narayan"
                        className="hero__profile-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
