<<<<<<< HEAD
import SectionHeading from '../SectionHeading';
import BeliefCard from '../BeliefCard';
import content from '../../data/content.json';

const PhilosophySection = () => {
    const { philosophy } = content;

    return (
        <section className="philosophy">
            <div className="philosophy__container">
                <div className="philosophy__card">
                    <div className="philosophy__bg-element"></div>
                    <div className="philosophy__content">
                        <SectionHeading subtitle={philosophy.sectionSubtitle} dark>
                            {philosophy.sectionTitle}
                        </SectionHeading>
                        <div className="philosophy__grid">
                            {philosophy.beliefs.map((belief, idx) => (
                                <BeliefCard
                                    key={idx}
                                    category={belief.category}
                                    statement={belief.statement}
                                    muted={belief.muted}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
=======
import SectionHeading from '../SectionHeading';
import BeliefCard from '../BeliefCard';
import content from '../../data/content.json';

const PhilosophySection = () => {
    const { philosophy } = content;

    return (
        <section className="philosophy">
            <div className="philosophy__container">
                <div className="philosophy__card">
                    <div className="philosophy__bg-element"></div>
                    <div className="philosophy__content">
                        <SectionHeading subtitle={philosophy.sectionSubtitle} dark>
                            {philosophy.sectionTitle}
                        </SectionHeading>
                        <div className="philosophy__grid">
                            {philosophy.beliefs.map((belief, idx) => (
                                <BeliefCard
                                    key={idx}
                                    category={belief.category}
                                    statement={belief.statement}
                                    muted={belief.muted}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
