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
  RESTART = 4,
  TICK = 5,
  CHANGE_STAGE = 6,
}
