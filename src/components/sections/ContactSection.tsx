import content from '../../data/content.json';
import type { ContentData } from '../../types';

const ContactSection = () => {
    const { contact } = content as ContentData;

    return (
        <section id="contact" className="contact">
            <div className="contact__container">
                <h2 className="contact__headline">
                    {contact.headline.line1}<br />{contact.headline.line2}
                </h2>
                <p className="contact__description">{contact.description}</p>
                <div className="contact__cta">
                    <a href={`mailto:${contact.email}`} className="contact__link">
                        {contact.ctaLabel}
                    </a>
                    <div className="contact__socials">
                        {contact.socialLinks.map((link, idx) => (
                            <a key={idx} href={link.href} className="contact__social">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
