import SEO from '../components/SEO';
import {
    Navbar,
    Footer,
    HeroSection,
    AboutSection,
    OperatingSystemSection,
    TimelineSection,
    StrategySection,
    PhilosophySection,
    LatestBlogsSection
} from '../components';

const HomePage = () => {
    return (
        <div className="app">
            <SEO
                title="Home"
                description="Indie hacker and full-stack developer building SaaS products. Specializing in React, Node.js, and AI-powered solutions."
            />
            <Navbar />
            <HeroSection />
            <AboutSection />
            <OperatingSystemSection />
            <TimelineSection />
            <LatestBlogsSection />
            <StrategySection />
            <PhilosophySection />
            <Footer />
        </div>
    );
};

export default HomePage;
