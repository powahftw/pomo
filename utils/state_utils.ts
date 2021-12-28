import { AppState } from '../store/timer';
import { TimerState } from '../types/enum';

export const didTimerRecentlyFinish = (
  prevState: AppState | undefined,
  currState: AppState
) =>
  prevState &&
  prevState.timerState === TimerState.PLAYING &&
  prevState.timeLeft === 0 &&
  currState.timerState === TimerState.PAUSED;
