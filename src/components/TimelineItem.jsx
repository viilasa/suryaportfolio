<<<<<<< HEAD
const TimelineItem = ({ period, title, description, active = false }) => (
    <div className={`timeline-item ${active ? 'timeline-item--active' : ''}`}>
        <div className={`timeline-item__dot ${active ? 'timeline-item__dot--active' : ''}`}>
            {active && <div className="timeline-item__dot-ring"></div>}
        </div>
        <h4 className={`timeline-item__period ${active ? 'timeline-item__period--active' : ''}`}>
            {period}
        </h4>
        <h3 className="timeline-item__title">{title}</h3>
        <p className={`timeline-item__description ${active ? 'timeline-item__description--active' : ''}`}>
            {description}
        </p>
    </div>
);

export default TimelineItem;
=======
const TimelineItem = ({ period, title, description, active = false }) => (
    <div className={`timeline-item ${active ? 'timeline-item--active' : ''}`}>
        <div className={`timeline-item__dot ${active ? 'timeline-item__dot--active' : ''}`}>
            {active && <div className="timeline-item__dot-ring"></div>}
        </div>
        <h4 className={`timeline-item__period ${active ? 'timeline-item__period--active' : ''}`}>
            {period}
        </h4>
        <h3 className="timeline-item__title">{title}</h3>
        <p className={`timeline-item__description ${active ? 'timeline-item__description--active' : ''}`}>
            {description}
        </p>
    </div>
);

export default TimelineItem;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
