import { Theme } from '../types/themes';

export type State = {
  currentTheme: Theme;
}

export type Action = {
  newTheme: Theme;
}

export const DEFAULT_THEME = {
  currentTheme: Theme.LIGHT,
};

export function themeReducer(state: State, action: Action) {
  return { ...state, currentTheme: action.newTheme };
}
