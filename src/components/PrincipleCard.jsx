import { Zap, Target, Cpu } from 'lucide-react';

const iconMap = {
    Zap: Zap,
    Target: Target,
    Cpu: Cpu
};

const colorMap = {
    amber: 'principle-card__icon--amber',
    red: 'principle-card__icon--red',
    blue: 'principle-card__icon--blue'
};

const PrincipleCard = ({ iconName, iconColor, title, description, index = 0 }) => {
    const IconComponent = iconMap[iconName] || Zap;
    const colorClass = colorMap[iconColor] || '';

    return (
        <div
            className="principle-card hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="principle-card__icon-wrapper">
                <div className={`principle-card__icon ${colorClass}`}>
                    <IconComponent size={24} />
                </div>
                <div className="principle-card__icon-glow"></div>
            </div>
            <h3 className="principle-card__title">{title}</h3>
            <p className="principle-card__description">{description}</p>

            {/* Decorative corner accent */}
            <div className="principle-card__accent"></div>
        </div>
    );
};

export default PrincipleCard;

