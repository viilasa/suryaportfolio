<<<<<<< HEAD
import SectionHeading from '../SectionHeading';
import StatCard from '../StatCard';
import content from '../../data/content.json';

const AboutSection = () => {
    const { about } = content;

    return (
        <section id="about" className="about">
            <div className="about__container">
                <SectionHeading subtitle={about.sectionSubtitle}>{about.sectionTitle}</SectionHeading>
                <div className="about__grid">
                    <div className="about__content">
                        {about.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="about__paragraph" dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                        <p className="about__quote">{about.quote}</p>
                    </div>
                    <div className="about__stats">
                        {about.stats.map((stat, idx) => (
                            <StatCard key={idx} value={stat.value} label={stat.label} variant={stat.variant} />
                        ))}
                        <div className="about__current">
                            <div className="about__current-label">{about.currentlyShipping.label}</div>
                            <div className="about__current-value">{about.currentlyShipping.value}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
=======
import SectionHeading from '../SectionHeading';
import StatCard from '../StatCard';
import content from '../../data/content.json';

const AboutSection = () => {
    const { about } = content;

    return (
        <section id="about" className="about">
            <div className="about__container">
                <SectionHeading subtitle={about.sectionSubtitle}>{about.sectionTitle}</SectionHeading>
                <div className="about__grid">
                    <div className="about__content">
                        {about.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="about__paragraph" dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                        <p className="about__quote">{about.quote}</p>
                    </div>
                    <div className="about__stats">
                        {about.stats.map((stat, idx) => (
                            <StatCard key={idx} value={stat.value} label={stat.label} variant={stat.variant} />
                        ))}
                        <div className="about__current">
                            <div className="about__current-label">{about.currentlyShipping.label}</div>
                            <div className="about__current-value">{about.currentlyShipping.value}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
