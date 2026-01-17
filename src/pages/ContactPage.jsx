import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Twitter, Linkedin, Instagram } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import content from '../data/content.json';

const iconMap = {
    Twitter,
    Linkedin,
    Instagram
};

const ContactPage = () => {
    const { contact } = content;
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Failed to send message. Please try emailing directly.');
        }
    };

    return (
        <div className="app">
            <Navbar />
            <main className="page contact-page">
                {/* Decorative elements */}
                <div className="floating-orb floating-orb--1"></div>
                <div className="floating-orb floating-orb--2"></div>
                <div className="grid-pattern"></div>

                <div className="page__container">
                    <div className="contact-page__layout">
                        {/* Left - Info */}
                        <div className="contact-page__info">
                            <SectionHeading subtitle={contact.sectionSubtitle}>
                                {contact.sectionTitle}
                            </SectionHeading>

                            <h2 className="contact-page__headline">
                                {contact.headline.line1}<br />{contact.headline.line2}
                            </h2>

                            <p className="contact-page__description">{contact.description}</p>

                            <div className="contact-page__email">
                                <span className="contact-page__email-label">Email me directly</span>
                                <a href={`mailto:${contact.email}`} className="contact-page__email-link">
                                    {contact.email}
                                </a>
                            </div>

                            <div className="contact-page__socials">
                                <span className="contact-page__socials-label">Or find me on</span>
                                <div className="contact-page__socials-links">
                                    {contact.socialLinks.map((link, idx) => {
                                        const IconComponent = iconMap[link.icon];
                                        return (
                                            <a
                                                key={idx}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="contact-page__social-link"
                                            >
                                                {IconComponent && <IconComponent size={20} />}
                                                <span>{link.label}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right - Form */}
                        <div className="contact-page__form-wrapper">
                            <form
                                action="https://formsubmit.co/inbox.suryanarayan@gmail.com"
                                method="POST"
                                onSubmit={handleSubmit}
                                className="contact-form"
                            >
                                {/* FormSubmit configuration */}
                                <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />
                                <input type="text" name="_honey" style={{ display: 'none' }} />

                                <h3 className="contact-form__title">Send a Message</h3>

                                <div className="contact-form__grid">
                                    <div className="contact-form__field">
                                        <label htmlFor="name" className="contact-form__label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="contact-form__input"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="contact-form__field">
                                        <label htmlFor="email" className="contact-form__label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="contact-form__input"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="contact-form__field">
                                    <label htmlFor="subject" className="contact-form__label">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="contact-form__input"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div className="contact-form__field">
                                    <label htmlFor="message" className="contact-form__label">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="contact-form__textarea"
                                        placeholder="Tell me about your project or idea..."
                                    />
                                </div>

                                {status === 'success' && (
                                    <div className="contact-form__alert contact-form__alert--success">
                                        <CheckCircle size={20} />
                                        <span>Message sent successfully! I'll get back to you soon.</span>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="contact-form__alert contact-form__alert--error">
                                        <AlertCircle size={20} />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="contact-form__submit"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>Sending...</>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;

