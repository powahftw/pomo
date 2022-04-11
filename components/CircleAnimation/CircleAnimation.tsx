import { useEffect, useState } from 'react';
import { Stage } from '../../types/enum';
import css from './CircleAnimation.module.css';

export default function CircleAnimation({
  children,
  currStage,
  timeLeft,
  totalTime,
}) {
  const [isWideUI, setIsWideUI] = useState(true);

  const handleResize = () => {
    setIsWideUI(window.innerWidth > 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const circleRadius = isWideUI ? 320 : 240;
  const maxDashoffset = circleRadius * 3.14;

  const progress = (timeLeft / totalTime) * maxDashoffset;
  const currColor =
    currStage === Stage.WORK ? 'text-main-color' : 'text-pause-text-timer-color';

  return (
    <div className="lg:w-80 w-60 lg:h-80 h-60 relative">
      <svg className={`${css.svg}`} height="100%" width="100%">
        <circle
          style={{ ['--radius' as any]: circleRadius }}
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
