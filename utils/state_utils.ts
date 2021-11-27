import { State } from '../store/timer';
import { TimerState } from '../types/enum';

export const didTimerRecentlyFinish = (
  prevState: State | undefined,
  currState: State
) =>
  prevState &&
  prevState.timerState === TimerState.PLAYING &&
  prevState.timeLeft === 0 &&
  currState.timerState === TimerState.PAUSED;
