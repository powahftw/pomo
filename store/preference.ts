import { Theme } from '../types/themes';
import { DEFAULT_STAGE_TO_TIME } from './timer';

export const DEFAULT_PREFERENCE = {
  'color-theme': Theme.LIGHT,
  'timer-preference': DEFAULT_STAGE_TO_TIME,
  'auto-switch': true,
  'browser-notifications': false,
  'enable-sounds': false,
  'long-pause-every-n-sessions': 4,
};

export type Preference = typeof DEFAULT_PREFERENCE;
export type PreferenceKeys = Partial<keyof Preference>;
export type State = Preference;

export const PREFERENCE_LS_KEY = 'preference';

export enum ActionType {
  UPDATE_PREFERENCE = 1,
  RESET = 2,
}

export type Action = {
  type: ActionType;
  newPreferences: Partial<Preference>;
};

export function preferenceReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE_PREFERENCE:
      return { ...state, ...action.newPreferences };
    case ActionType.RESET:
      return DEFAULT_PREFERENCE;
    default:
      throw new Error('Action not implemented');
  }
}
