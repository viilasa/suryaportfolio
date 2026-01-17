<<<<<<< HEAD
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
=======
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
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
