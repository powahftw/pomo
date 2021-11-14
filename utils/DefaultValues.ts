import { State, Stage } from "../types/enum";

const DefaultValues = {
  DEFAULT_WORK_TIME: 1 * 60,
  DEFAULT_REST_TIME: 0.5 * 60,

  DEFAULT_STATE: State.STOPPED,
  DEFAULT_STAGE: Stage.WORK,
};

export default DefaultValues;
