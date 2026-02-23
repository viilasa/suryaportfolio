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
                description="Surya Narayan — indie hacker and full-stack developer building SaaS products like ProofEdge and NovaNews. Specializing in React, Node.js, and AI-powered solutions. Based in India, building in public."
                url="/"
                keywords="Surya Narayan, indie hacker, full-stack developer, SaaS builder, React developer, Node.js developer, ProofEdge, AI developer, startup founder, build in public, freelance developer India"
                breadcrumbs={[
                    { name: "Home", url: "/" }
                ]}
                faqItems={[
                    { question: "Who is Surya Narayan?", answer: "Surya Narayan is an indie hacker and full-stack developer from India who builds SaaS products like ProofEdge and NovaNews. He specializes in React, Node.js, TypeScript, and AI-powered solutions." },
                    { question: "What is ProofEdge?", answer: "ProofEdge is a social proof SaaS platform that helps websites display real-time notification popups to boost conversions. It features simple one-line code integration and affordable pricing." },
                    { question: "What tech stack does Surya Narayan use?", answer: "Surya uses React, Node.js, TypeScript, PostgreSQL, Vite, and TailwindCSS. He deploys on Vercel and Railway and is learning Medusa JS for e-commerce." },
                    { question: "How can I hire Surya Narayan?", answer: "You can reach Surya via the contact page or email inbox.suryanarayan@gmail.com. He works on SaaS products, web apps, and freelance development for international clients." }
                ]}
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
