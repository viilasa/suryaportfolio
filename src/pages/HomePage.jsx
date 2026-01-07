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
