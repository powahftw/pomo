export enum TimerState {
  STOPPED,
  PAUSED,
  PLAYING,
}

export enum Stage {
  WORK = 'work',
  SHORT_REST = 'short-rest',
  LONG_REST = 'long-rest',
}

export enum ActionType {
  PLAY = 1,
  PAUSE = 2,
  STOP = 3,
  RESTART = 4,
  TICK = 5,
  CHANGE_TIMER_SETTINGS = 6,
  CHANGE_STAGE = 7,
}
