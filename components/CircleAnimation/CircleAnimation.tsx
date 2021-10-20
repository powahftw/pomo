import { useRef } from 'react';
import { Stage, State } from '../../types/enum';
import css from './CircleAnimation.module.css';

export default function CircleAnimation({ children, currStage, currState }) {
  const currColor = currStage === Stage.WORK ? '#7F1D1D' : '#14532D';

  const curr = useRef<SVGCircleElement>();

  if (currState === State.PLAYING) {
    curr!.current!.style.animationPlayState = 'running';
  } else {
    curr!.current!.style.animationPlayState = 'paused';
  }

  return (
    <div className="w-64 h-64 relative">
      <svg
        viewBox="0 0 256 256"
        className={`${css.svg}`}
        height="100%"
        width="100%"
      >
        <circle
          ref={curr}
          className={`${css.circle}`}
          cx="50%"
          cy="50%"
          r="50%"
          stroke={`${currColor}`}
          strokeWidth="10"
          fillOpacity="0"
        />
      </svg>
      {children}
    </div>
  );
}
