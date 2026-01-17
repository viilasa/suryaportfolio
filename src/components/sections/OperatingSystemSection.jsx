import SectionHeading from '../SectionHeading';
import PrincipleCard from '../PrincipleCard';
import content from '../../data/content.json';

const OperatingSystemSection = () => {
    const { operatingSystem } = content;

    return (
        <section id="os" className="os">
            {/* Decorative element */}
            <div className="os__decoration">
                <div className="os__decoration-circle"></div>
            </div>

            <div className="os__container">
                <SectionHeading subtitle={operatingSystem.sectionSubtitle}>
                    {operatingSystem.sectionTitle}
                </SectionHeading>
                <div className="os__grid">
                    {operatingSystem.principles.map((principle, idx) => (
                        <PrincipleCard
                            key={idx}
                            index={idx}
                            iconName={principle.iconName}
                            iconColor={principle.iconColor}
                            title={principle.title}
                            description={principle.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OperatingSystemSection;
