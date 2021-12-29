import { ActionType, Stage, TimerState } from '../types/enum';

export type AppState = {
  timerState: TimerState;
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

export const stageToTime = new Map<Stage, number>([
  [Stage.WORK, DEFAULT_WORK_TIME],
  [Stage.SHORT_REST, DEFAULT_REST_TIME],
  [Stage.LONG_REST, DEFAULT_REST_TIME * 5],
]);

export type Action = {
  type: ActionType;
  transitionTo?: Stage;
};

export const DEFAULT_APP_STATE = {
  timerState: DEFAULT_TIMER_STATE,
  stage: DEFAULT_STAGE,
  timeLeft: stageToTime.get(DEFAULT_STAGE),
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
      return DEFAULT_APP_STATE;
    case ActionType.RESTART:
      return {
        ...state,
        timerState: TimerState.PLAYING,
        timeLeft: stageToTime.get(state.stage),
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
        timerState: TimerState.PAUSED,
        stage: action.transitionTo,
        timeLeft: stageToTime.get(action.transitionTo),
      };
    default:
      throw new Error('Action not implemented');
  }
}
