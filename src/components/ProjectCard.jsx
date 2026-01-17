<<<<<<< HEAD
import { Terminal, ShieldCheck } from 'lucide-react';

const ProjectCard = ({ title, date, concept, friction, lesson, status = "Completed", index = 0 }) => (
    <div
        className="project-card hover-lift"
        style={{ animationDelay: `${index * 0.15}s` }}
    >
        <div className="project-card__header">
            <div className="project-card__icon icon-bounce">
                <Terminal size={24} />
            </div>
            <span className={`project-card__status ${status === 'Active' ? 'project-card__status--active' : ''}`}>
                {status === 'Active' && <span className="project-card__status-dot"></span>}
                {status}
            </span>
        </div>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__date">Started: {date}</p>

        <div className="project-card__content">
            <div className="project-card__section">
                <h4 className="project-card__label">Concept</h4>
                <p className="project-card__text">{concept}</p>
            </div>

            {friction && (
                <div className="project-card__section">
                    <h4 className="project-card__label">The Friction</h4>
                    <p className="project-card__text">{friction}</p>
                </div>
            )}

            <div className="project-card__lesson">
                <div className="project-card__lesson-header">
                    <ShieldCheck size={16} className="project-card__lesson-icon" />
                    The Lesson
                </div>
                <p className="project-card__lesson-text">{lesson}</p>
            </div>
        </div>

        {/* Decorative gradient line at bottom */}
        <div className="project-card__gradient-line"></div>
    </div>
);

export default ProjectCard;
=======
import { Terminal, ShieldCheck } from 'lucide-react';

const ProjectCard = ({ title, date, concept, friction, lesson, status = "Completed", index = 0 }) => (
    <div
        className="project-card hover-lift"
        style={{ animationDelay: `${index * 0.15}s` }}
    >
        <div className="project-card__header">
            <div className="project-card__icon icon-bounce">
                <Terminal size={24} />
            </div>
            <span className={`project-card__status ${status === 'Active' ? 'project-card__status--active' : ''}`}>
                {status === 'Active' && <span className="project-card__status-dot"></span>}
                {status}
            </span>
        </div>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__date">Started: {date}</p>

        <div className="project-card__content">
            <div className="project-card__section">
                <h4 className="project-card__label">Concept</h4>
                <p className="project-card__text">{concept}</p>
            </div>

            {friction && (
                <div className="project-card__section">
                    <h4 className="project-card__label">The Friction</h4>
                    <p className="project-card__text">{friction}</p>
                </div>
            )}

            <div className="project-card__lesson">
                <div className="project-card__lesson-header">
                    <ShieldCheck size={16} className="project-card__lesson-icon" />
                    The Lesson
                </div>
                <p className="project-card__lesson-text">{lesson}</p>
            </div>
        </div>

        {/* Decorative gradient line at bottom */}
        <div className="project-card__gradient-line"></div>
    </div>
);

export default ProjectCard;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
