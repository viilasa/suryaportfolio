import SEO from '../components/SEO';
import {
    Navbar,
    Footer,
    HeroSection,
    AboutSection,
    OperatingSystemSection,
    TimelineSection,
    StrategySection,
    PhilosophySection
} from '../components';

const HomePage = () => {
    return (
        <div className="app">
            <SEO
                title="Home"
                description="Frontend Developer & UI/UX Designer building digital products."
            />
            <Navbar />
            <HeroSection />
            <AboutSection />
            <OperatingSystemSection />
            <TimelineSection />
            <StrategySection />
            <PhilosophySection />
            <Footer />
        </div>
    );
};

export default HomePage;

