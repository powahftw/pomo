import { Stage } from '../../types/enum';

import { didTimerRecentlyFinish } from '../../utils/state_utils';
import usePrevious from '../../hooks/usePrevious';
import { useEffect } from 'react';
import { usePreference } from '../../providers/preference-context';

export default function TimerDisplay({ state }) {
  const prevState = usePrevious(state);
  const {
    state: { 'enable-sounds': enableSounds },
  } = usePreference();

  useEffect(() => {
    if (enableSounds && didTimerRecentlyFinish(prevState, state)) {
      const audio = new Audio('alarm.mp3');
      audio.volume = 0.2;
      audio.play();
    }
  }, [state.timerState]);

  const secondstoHHMMSS = (sec: number) => {
    if (sec <= 0) {
      return '00:00';
    }
    const h = Math.floor(sec / (60 * 60));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return (
      [h, m, s]
        // If hours are 0 we skip it.
        .filter((val, idx) => val !== 0 || idx > 0)
        .map((val) => (val < 10 ? '0' : '') + val)
        .join(':')
    );
  };

  const currBgColor =
    state.currStage === Stage.WORK ? 'bg-el-bg-color' : 'bg-emerald-100';
  const currColor =
    state.currStage === Stage.WORK ? 'text-main-color' : 'text-emerald-500';

  return (
    <div
      className={`transition-colors duration-700 
      w-64 h-64 
      ${currBgColor} shadow-2xl border-solid border-4 border-light-blue-500  rounded-full grid place-items-center`}
    >
      <span
        className={`transition-colors duration-700 text-5xl ${currColor} font-mono`}
      >
        {secondstoHHMMSS(state.timeLeft)}
      </span>
    </div>
  );
}
