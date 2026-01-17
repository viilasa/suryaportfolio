<<<<<<< HEAD
const BeliefCard = ({ category, statement, muted = false }) => (
    <div className="belief-card">
        <h4 className="belief-card__category">{category}</h4>
        <p className={`belief-card__statement ${muted ? 'belief-card__statement--muted' : ''}`}>
            {statement}
        </p>
    </div>
);

export default BeliefCard;
=======
const BeliefCard = ({ category, statement, muted = false }) => (
    <div className="belief-card">
        <h4 className="belief-card__category">{category}</h4>
        <p className={`belief-card__statement ${muted ? 'belief-card__statement--muted' : ''}`}>
            {statement}
        </p>
    </div>
);

export default BeliefCard;
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
