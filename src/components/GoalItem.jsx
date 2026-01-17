import { CheckCircle2 } from 'lucide-react';

const GoalItem = ({ children }) => (
    <li className="goal-item">
        <div className="goal-item__icon">
            <CheckCircle2 size={16} />
        </div>
        {children}
    </li>
);

export default GoalItem;
