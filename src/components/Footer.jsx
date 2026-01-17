import content from '../data/content.json';

const Footer = () => {
    const { footer, site } = content;

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__brand">
                    <span className="footer__logo">
                        {site.name}<span className="footer__logo-dot">.</span>
                    </span>
                    <span className="footer__separator">|</span>
                    <span className="footer__tagline">
                        <div className="footer__tagline-dot"></div>
                        {site.tagline}
                    </span>
                </div>
                <p className="footer__quote">{footer.quote}</p>
                <div className="footer__copyright">
                    &copy; {new Date().getFullYear()} {footer.copyright}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

