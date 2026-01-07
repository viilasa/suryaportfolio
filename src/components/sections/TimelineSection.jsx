import { Code2 } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import TimelineItem from '../TimelineItem';
import content from '../../data/content.json';

const TimelineSection = () => {
    const { timeline } = content;

    return (
        <section id="timeline" className="timeline">
            {/* Decorative floating elements */}
            <div className="timeline__decorations">
                <div className="timeline__decoration timeline__decoration--orb1"></div>
                <div className="timeline__decoration timeline__decoration--orb2"></div>
            </div>

            <div className="timeline__container">
                <div className="timeline__grid">
                    <div className="timeline__main">
                        <SectionHeading subtitle={timeline.sectionSubtitle} dark>
                            {timeline.sectionTitle}
                        </SectionHeading>
                        <div className="timeline__list">
                            {timeline.events.map((event, idx) => (
                                <TimelineItem
                                    key={idx}
                                    period={event.period}
                                    title={event.title}
                                    description={event.description}
                                    active={event.active}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="timeline__quote-card">
                        {timeline.quoteImage ? (
                            <div className="timeline__quote-image-wrapper animate-float">
                                <img
                                    src={timeline.quoteImage}
                                    alt={timeline.quoteAuthor || 'Quote'}
                                    className="timeline__quote-image"
                                />
                            </div>
                        ) : (
                            <div className="timeline__quote-icon-wrapper animate-float">
                                <Code2 size={48} className="timeline__quote-icon" />
                            </div>
                        )}
                        <p className="timeline__quote-text">{timeline.quote}</p>
                        {timeline.quoteAuthor && (
                            <span className="timeline__quote-author">— {timeline.quoteAuthor}</span>
                        )}

                        {/* Decorative lines */}
                        <div className="timeline__quote-lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
