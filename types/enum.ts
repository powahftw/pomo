export enum TimerState {
  STOPPED,
  PAUSED,
  PLAYING,
}

export enum Stage {
  WORK,
  SHORT_REST,
  LONG_REST,
}

export enum ActionType {
  PLAY = 1,
  PAUSE = 2,
  STOP = 3,
  TICK = 4,
  CHANGE_STAGE = 5,
}
