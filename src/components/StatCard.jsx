const StatCard = ({ value, label, variant = 'light' }) => (
    <div className={`stat-card hover-glow ${variant === 'dark' ? 'stat-card--dark' : ''}`}>
        <div className="stat-card__value">
            <span className="stat-card__value-text">{value}</span>
            {variant === 'dark' && <div className="stat-card__shimmer"></div>}
        </div>
        <div className="stat-card__label">{label}</div>

        {/* Decorative accent */}
        <div className="stat-card__accent"></div>
    </div>
);

export default StatCard;
