<<<<<<< HEAD
import SectionHeading from '../SectionHeading';
import ProjectCard from '../ProjectCard';
import content from '../../data/content.json';

const ProjectsSection = () => {
    const { projects } = content;

    return (
        <section id="projects" className="projects">
            {/* Decorative elements */}
            <div className="projects__decoration">
                <div className="dots-pattern" style={{ top: '10%', right: '5%' }}></div>
                <div className="dots-pattern" style={{ bottom: '15%', left: '3%' }}></div>
            </div>

            <div className="projects__container">
                <SectionHeading subtitle={projects.sectionSubtitle}>
                    {projects.sectionTitle}
                </SectionHeading>
                <div className="projects__grid">
                    {projects.items.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            index={idx}
                            title={project.title}
                            date={project.date}
                            status={project.status}
                            concept={project.concept}
                            friction={project.friction}
                            lesson={project.lesson}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
=======
import SectionHeading from '../SectionHeading';
import ProjectCard from '../ProjectCard';
import content from '../../data/content.json';

const ProjectsSection = () => {
    const { projects } = content;

    return (
        <section id="projects" className="projects">
            {/* Decorative elements */}
            <div className="projects__decoration">
                <div className="dots-pattern" style={{ top: '10%', right: '5%' }}></div>
                <div className="dots-pattern" style={{ bottom: '15%', left: '3%' }}></div>
            </div>

            <div className="projects__container">
                <SectionHeading subtitle={projects.sectionSubtitle}>
                    {projects.sectionTitle}
                </SectionHeading>
                <div className="projects__grid">
                    {projects.items.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            index={idx}
                            title={project.title}
                            date={project.date}
                            status={project.status}
                            concept={project.concept}
                            friction={project.friction}
                            lesson={project.lesson}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
