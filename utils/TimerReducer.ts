import { State, Stage } from "../types/enum";
import DefaultValues from "./DefaultValues";

const TimerReducer = (state, action) => {
  let newState;
  switch (action.type) {
    // State handling
    case "start":
      newState = { ...state, currState: State.PLAYING };
      break;
    case "pause":
      newState = { ...state, currState: State.PAUSED };
      break;
    case "stop":
      newState = {
        ...state,
        timeLeft: DefaultValues.DEFAULT_WORK_TIME,
        currState: State.STOPPED,
        currStage: Stage.WORK,
      };
      break;

    case "switch":
      const nextStage =
        state.currStage === Stage.WORK ? Stage.REST : Stage.WORK;
      const nextTimeLeft =
        nextStage === Stage.WORK
          ? DefaultValues.DEFAULT_WORK_TIME
          : DefaultValues.DEFAULT_REST_TIME;
      newState = {
        ...state,
        timeLeft: nextTimeLeft,
        currStage: nextStage,
        ...(nextStage === Stage.WORK && { nSessions: state.nSessions + 1 }),
      };
      break;

    // Tick handling
    case "tick":
      newState = { ...state, timeLeft: state.timeLeft - 1 };
      break;

    default:
      throw new Error();
  }
  return newState;
};

export default TimerReducer;
