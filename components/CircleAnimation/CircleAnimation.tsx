import { Stage } from '../../types/enum';
import css from './CircleAnimation.module.css';

const MAX_DASHOFFSET = 320 * 3.14;

export default function CircleAnimation({
  children,
  currStage,
  timeLeft,
  totalTime,
}) {
  const progress = (timeLeft / totalTime) * MAX_DASHOFFSET;
  const currColor =
    currStage === Stage.WORK ? 'text-main-color' : 'text-emerald-500';

  return (
    <div className="w-80 h-80 relative">
      <svg className={`${css.svg}`} height="100%" width="100%">
        <circle
          strokeDashoffset={`${progress}px`}
          className={`${css.circle} stroke-current ${currColor}`}
          cx="50%"
          cy="50%"
          r="50%"
          strokeWidth="10"
          fillOpacity="0"
        />
      </svg>
      {children}
    </div>
  );
}
