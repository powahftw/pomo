import { ActionType, Stage, TimerState } from '../types/enum';

const DEFAULT_WORK_TIME = 25 * 60;
const DEFAULT_REST_TIME = 5 * 60;

const DEFAULT_TIMER_STATE = TimerState.STOPPED;
const DEFAULT_STAGE = Stage.WORK;

export const DEFAULT_STAGE_TO_TIME = {
  [Stage.WORK]: DEFAULT_WORK_TIME,
  [Stage.SHORT_REST]: DEFAULT_REST_TIME,
  [Stage.LONG_REST]: DEFAULT_REST_TIME * 4,
};

export const DEFAULT_COMPLETED_STAGES = {
  [Stage.WORK]: 0,
  [Stage.SHORT_REST]: 0,
  [Stage.LONG_REST]: 0,
};

export type CompletedStageType = typeof DEFAULT_COMPLETED_STAGES;

export type AppState = {
  timerState: TimerState;
  timerSettings: typeof DEFAULT_STAGE_TO_TIME;
  stage: Stage;
  timeLeft: number;
  cycleCompleted: CompletedStageType;
  everStarted: boolean;
};

export type Action = {
  type: ActionType;
  transitionTo?: Stage;
  newTimerSettings?: typeof DEFAULT_STAGE_TO_TIME;
};

export const DEFAULT_APP_STATE = {
  timerState: DEFAULT_TIMER_STATE,
  stage: DEFAULT_STAGE,
  timerSettings: DEFAULT_STAGE_TO_TIME,
  timeLeft: DEFAULT_STAGE_TO_TIME[DEFAULT_STAGE],
  cycleCompleted: DEFAULT_COMPLETED_STAGES,
  everStarted: false,
};

const increaseCycle = (
  currCycleCompleted: CompletedStageType,
  currStage: Stage
): CompletedStageType => {
  return {
    [Stage.WORK]:
      currCycleCompleted['work'] + (currStage === Stage.WORK ? 1 : 0),
    [Stage.SHORT_REST]:
      currCycleCompleted['short-rest'] +
      (currStage === Stage.SHORT_REST ? 1 : 0),
    [Stage.LONG_REST]:
      currCycleCompleted['long-rest'] + (currStage === Stage.LONG_REST ? 1 : 0),
  };
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
        cycleCompleted: state.cycleCompleted,
        timeLeft: state.timerSettings[DEFAULT_STAGE] * 60,
        timerSettings: state.timerSettings,
      };
    case ActionType.RESTART:
      return {
        ...state,
        timerState: TimerState.PLAYING,
        timeLeft: state.timerSettings[state.stage] * 60,
      };
    case ActionType.TICK:
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }
      return {
        ...state,
        timerState: TimerState.PAUSED,
        cycleCompleted: increaseCycle(state.cycleCompleted, state.stage),
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
      const newBaseTimer = action.newTimerSettings[state.stage] * 60;
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
        timeLeft: state.timerSettings[action.transitionTo] * 60,
      };
    default:
      throw new Error('Action not implemented');
  }
}
