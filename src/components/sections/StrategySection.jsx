import { Rocket } from 'lucide-react';
import GoalItem from '../GoalItem';
import SkillBadge from '../SkillBadge';
import content from '../../data/content.json';

const StrategySection = () => {
    const { strategy } = content;

    return (
        <section className="strategy">
            <div className="strategy__container">
                <div className="strategy__grid">
                    <div className="strategy__future">
                        <h3 className="strategy__heading">
                            <Rocket size={24} className="strategy__heading-icon" />
                            {strategy.futureHeading}
                        </h3>
                        <div className="strategy__goals">
                            <div className="strategy__goal-group">
                                <h4 className="strategy__goal-label">{strategy.shortTerm.label}</h4>
                                <ul className="strategy__goal-list">
                                    {strategy.shortTerm.goals.map((goal, idx) => (
                                        <GoalItem key={idx}>{goal}</GoalItem>
                                    ))}
                                </ul>
                            </div>
                            <div className="strategy__goal-group">
                                <h4 className="strategy__goal-label">{strategy.longTerm.label}</h4>
                                <ul className="strategy__goal-list">
                                    {strategy.longTerm.goals.map((goal, idx) => (
                                        <GoalItem key={idx}>{goal}</GoalItem>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="strategy__learning">
                        <h3 className="strategy__learning-heading">{strategy.learningHeading}</h3>
                        <div className="strategy__skills">
                            {strategy.skills.map((skill, idx) => (
                                <SkillBadge key={idx}>{skill}</SkillBadge>
                            ))}
                        </div>
                        <div className="strategy__why">
                            <p className="strategy__why-label">{strategy.whyNow.label}</p>
                            <p className="strategy__why-answer">{strategy.whyNow.answer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StrategySection;
