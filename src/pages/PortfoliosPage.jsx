import { ExternalLink, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import portfoliosData from '../data/portfolios.json';

const FeaturedProject = ({ project }) => (
    <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-featured"
    >
        {/* Website Preview Background */}
        <div className="portfolio-featured__preview">
            <iframe
                src={project.link}
                title={`${project.title} preview`}
                className="portfolio-featured__iframe"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
            />
            <div className="portfolio-featured__preview-overlay"></div>
        </div>

        <div className="portfolio-featured__badge">Featured Project</div>
        <div className="portfolio-featured__content">
            <div className="portfolio-featured__header">
                {project.logo && (
                    <img
                        src={project.logo}
                        alt={project.title}
                        className="portfolio-featured__logo"
                    />
                )}
                <div>
                    <h2 className="portfolio-featured__title">{project.title}</h2>
                    <span className="portfolio-featured__status">{project.status}</span>
                </div>
            </div>
            <p className="portfolio-featured__description">{project.description}</p>
            <div className="portfolio-featured__tags">
                {project.tags.map((tag, idx) => (
                    <span key={idx} className="portfolio-tag">{tag}</span>
                ))}
            </div>
            <div className="portfolio-featured__cta">
                Visit Website <ExternalLink size={16} />
            </div>
        </div>
    </a>
);

const ProjectCard = ({ project, index }) => (
    <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-card hover-lift"
        style={{ animationDelay: `${index * 0.1}s` }}
    >
        <div className="portfolio-card__header">
            <span className={`portfolio-card__status ${project.status === 'Active' ? 'portfolio-card__status--active' : ''}`}>
                {project.status === 'Active' && <span className="portfolio-card__status-dot"></span>}
                {project.status}
            </span>
            <span className="portfolio-card__date">{project.date}</span>
        </div>
        <h3 className="portfolio-card__title">{project.title}</h3>
        <p className="portfolio-card__description">{project.description}</p>
        <div className="portfolio-card__tags">
            {project.tags.map((tag, idx) => (
                <span key={idx} className="portfolio-tag portfolio-tag--small">{tag}</span>
            ))}
        </div>
        <div className="portfolio-card__link">
            View Project <ExternalLink size={14} />
        </div>
    </a>
);

const ClientWorkCard = ({ client, index }) => (
    <a
        href={client.link}
        target="_blank"
        rel="noopener noreferrer"
        className="client-card hover-lift"
        style={{ animationDelay: `${index * 0.1}s` }}
    >
        <div className="client-card__image-wrapper">
            {client.image ? (
                <img
                    src={client.image}
                    alt={client.title}
                    className="client-card__image"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                    }}
                />
            ) : null}
            <div className="client-card__placeholder" style={{ display: client.image ? 'none' : 'flex' }}>
                <span className="client-card__initial">{client.title.charAt(0)}</span>
            </div>
        </div>
        <div className="client-card__content">
            <span className="client-card__category">{client.category}</span>
            <h3 className="client-card__title">{client.title}</h3>
            <p className="client-card__description">{client.description}</p>
            <div className="client-card__link">
                Visit Site <ExternalLink size={14} />
            </div>
        </div>
    </a>
);

const PortfoliosPage = () => {
    return (
        <div className="app">
            <SEO
                title="Portfolio"
                description="Projects and client work by Surya Narayan. Full-stack developer building SaaS products like ProofEdge, NovaNews, and custom web applications with React, Node.js, and AI."
                url="/portfolios"
                keywords="Surya Narayan portfolio, full-stack developer projects, SaaS products, ProofEdge, NovaNews, React projects, indie hacker projects, web developer Goa, freelance developer India"
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Portfolio", url: "/portfolios" }
                ]}
            />
            <Navbar />
            <main className="page portfolios-page">
                {/* Decorative elements */}
                <div className="floating-orb floating-orb--1"></div>
                <div className="floating-orb floating-orb--2"></div>
                <div className="grid-pattern"></div>

                <div className="page__container">
                    <div className="page__header">
                        <SectionHeading subtitle={portfoliosData.pageSubtitle}>
                            {portfoliosData.pageTitle}
                        </SectionHeading>
                        <p className="page__description">{portfoliosData.description}</p>
                    </div>

                    {/* Featured Project */}
                    <FeaturedProject project={portfoliosData.featured} />

                    {/* All Projects */}
                    <div className="portfolios-section">
                        <h3 className="portfolios-section__title">My Projects</h3>
                        <div className="portfolios-grid">
                            {portfoliosData.projects.map((project, idx) => (
                                <ProjectCard key={project.title} project={project} index={idx} />
                            ))}
                        </div>
                    </div>

                    {/* Client Works */}
                    {portfoliosData.clientWorks && portfoliosData.clientWorks.length > 0 && (
                        <div className="portfolios-section portfolios-section--clients">
                            <div className="portfolios-section__header">
                                <Users size={24} />
                                <h3 className="portfolios-section__title">Client Works</h3>
                            </div>
                            <p className="portfolios-section__subtitle">
                                Websites and applications built for clients
                            </p>
                            <div className="clients-grid">
                                {portfoliosData.clientWorks.map((client, idx) => (
                                    <ClientWorkCard key={client.title} client={client} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PortfoliosPage;

