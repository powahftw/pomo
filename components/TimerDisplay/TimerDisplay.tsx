import { Stage, TimerState } from '../../types/enum';

import { didTimerRecentlyFinish } from '../../utils/state_utils';
import usePrevious from '../../hooks/usePrevious';
import { useEffect } from 'react';
import { usePreference } from '../../providers/preference-context';
import { useAppState } from '../../providers/app-state-context';

export default function TimerDisplay() {
  const { appState } = useAppState();
  const prevState = usePrevious(appState);
  const {
    state: { 'enable-sounds': enableSounds },
  } = usePreference();

  useEffect(() => {
    if (enableSounds && didTimerRecentlyFinish(prevState, appState)) {
      const audio = new Audio('alarm.mp3');
      audio.volume = 0.2;
      audio.play();
    }
  }, [appState.timerState]);

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
    appState.stage === Stage.WORK ? 'bg-el-bg-color' : 'bg-emerald-100';
  const currColor =
    appState.stage === Stage.WORK ? 'text-main-color' : 'text-emerald-500';

  const currStageTotTime = appState.timerSettings[appState.stage] * 60;
  const timerNotAtFull = appState.timeLeft < currStageTotTime;

  return (
    <div
      className={`transition-colors duration-500 
      lg:w-80 w-60 lg:h-80 h-60 
      ${currBgColor} shadow-2xl border-solid border-4 border-el-bg-hover-color rounded-full grid place-items-center`}
    >
      <span
        className={`transition-colors duration-700 ${currColor} font-mono flex flex-col items-center`}
      >
        <div className="text-5xl">{secondstoHHMMSS(appState.timeLeft)}</div>
        {timerNotAtFull && (
          <div className="text-lg">{secondstoHHMMSS(currStageTotTime)}</div>
        )}
      </span>
    </div>
  );
}
