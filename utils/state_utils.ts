import { AppState } from '../store/timer';
import { ActionType, TimerState } from '../types/enum';

export const didTimerRecentlyFinish = (
  prevState: AppState | undefined,
  currState: AppState
) =>
  prevState &&
  prevState.timerState === TimerState.PLAYING &&
  prevState.timeLeft === 0 &&
  currState.timerState === TimerState.PAUSED;

export const nextActionType = (currState: AppState): ActionType => {
  if (currState.timerState === TimerState.PLAYING) {
    return ActionType.PAUSE;
  } else if (currState.timeLeft == 0) {
    return ActionType.RESTART;
  } else {
    return ActionType.PLAY;
  }
};
