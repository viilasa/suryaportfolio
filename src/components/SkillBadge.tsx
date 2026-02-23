import type { SkillBadgeProps } from '../types';

const SkillBadge = ({ children }: SkillBadgeProps) => (
    <span className="skill-badge">{children}</span>
);

export default SkillBadge;
