import { CheckCircle2 } from 'lucide-react';
import type { GoalItemProps } from '../types';

const GoalItem = ({ children }: GoalItemProps) => (
    <li className="goal-item">
        <div className="goal-item__icon">
            <CheckCircle2 size={16} />
        </div>
        {children}
    </li>
);

export default GoalItem;
