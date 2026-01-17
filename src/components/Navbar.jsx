import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import content from '../data/content.json';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigation, site } = content;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          {site.name}<span className="navbar__logo-dot">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar__links">
          {navigation.links.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to={navigation.ctaButton.href} className="navbar__cta">
            {navigation.ctaButton.label}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`navbar__mobile-btn ${isMobileMenuOpen ? 'navbar__mobile-btn--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navigation.links.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className={`navbar__mobile-link ${location.pathname === link.href ? 'navbar__mobile-link--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to={navigation.ctaButton.href} className="navbar__mobile-cta">
          {navigation.ctaButton.label}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

