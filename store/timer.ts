import { ActionType, Stage, TimerState } from '../types/enum';

export type AppState = {
  timerState: TimerState;
  timerSettings: typeof DEFAULT_STATE_TO_TIME;
  stage: Stage;
  timeLeft: number;
  workCycleCompleted: number;
  everStarted: boolean;
};

const DEFAULT_WORK_TIME = 0.2 * 60;
const DEFAULT_REST_TIME = 0.1 * 60;

const DEFAULT_TIMER_STATE = TimerState.STOPPED;
const DEFAULT_STAGE = Stage.WORK;

export const AUTOMATIC_STAGE_SWITCH = true;
export const LONG_BREAK_EVERY_N_SESSION = 3;

export const DEFAULT_STATE_TO_TIME = {
  [Stage.WORK]: DEFAULT_WORK_TIME,
  [Stage.SHORT_REST]: DEFAULT_REST_TIME,
  [Stage.LONG_REST]: DEFAULT_REST_TIME * 5,
};

export type Action = {
  type: ActionType;
  transitionTo?: Stage;
  newTimerSettings?: typeof DEFAULT_STATE_TO_TIME;
};

export const DEFAULT_APP_STATE = {
  timerState: DEFAULT_TIMER_STATE,
  stage: DEFAULT_STAGE,
  timerSettings: DEFAULT_STATE_TO_TIME,
  timeLeft: DEFAULT_STATE_TO_TIME[DEFAULT_STAGE],
  workCycleCompleted: 0,
  everStarted: false,
};

export function appStateReducer(state: AppState, action: Action) {
  switch (action.type) {
    case ActionType.PLAY:
      return { ...state, timerState: TimerState.PLAYING, everStarted: true };
    case ActionType.PAUSE:
      return { ...state, timerState: TimerState.PAUSED };
    case ActionType.STOP:
      return {
        ...DEFAULT_APP_STATE,
        workCycleCompleted: state.workCycleCompleted,
        timeLeft: state.timerSettings[DEFAULT_STAGE],
        timerSettings: state.timerSettings,
      };
    case ActionType.RESTART:
      return {
        ...state,
        timerState: TimerState.PLAYING,
        timeLeft: state.timerSettings[state.stage],
        workCycleCompleted:
          state.workCycleCompleted + (state.stage === Stage.WORK ? 1 : 0),
      };
    case ActionType.TICK:
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }
      return {
        ...state,
        timerState: TimerState.PAUSED,
        workCycleCompleted:
          state.workCycleCompleted + (state.stage === Stage.WORK ? 1 : 0),
      };
    case ActionType.CHANGE_TIMER_SETTINGS:
      if (action.newTimerSettings == null) {
        throw new Error(
          'CHANGE_TIMER_SETTINGS Actions requires a payload with the new timer settings'
        );
      }
      // If the app is stopped we update the timeLeft right away, otherwise we only do so
      // if the user is trying to reduce the stage time below the current time left then we reduce the time left as well to prevent having
      // timeLeft > newBaseTimer (Which would look odd in the circle).
      const newBaseTimer = action.newTimerSettings[state.stage];
      return {
        ...state,
        timeLeft:
          state.timerState === TimerState.STOPPED
            ? newBaseTimer
            : Math.min(state.timeLeft, newBaseTimer),
        timerSettings: action.newTimerSettings,
      };
    case ActionType.CHANGE_STAGE:
      if (action.transitionTo == null) {
        throw new Error(
          'CHANGE_STATE Actions requires a payload with the state to transition to'
        );
      }
      if (action.transitionTo === state.stage) {
        return state; // Disregard transition with no effect.
      }
      return {
        ...state,
        everStarted: false,
        timerState:
          state.timerState === TimerState.STOPPED
            ? TimerState.STOPPED
            : TimerState.PAUSED,
        stage: action.transitionTo,
        timeLeft: state.timerSettings[action.transitionTo],
      };
    default:
      throw new Error('Action not implemented');
  }
}
