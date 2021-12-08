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

const themeToColor = new Map<Theme, string>([
  [Theme.DARK, '#232629'],
  [Theme.LIGHT, '#e3f1ff'],
]);

export function themeReducer(state: State, action: Action) {
  const bgColor = themeToColor.get(action.newTheme);
  document.documentElement.style.setProperty('--bg-color', bgColor);
  return { ...state, currentTheme: action.newTheme };
}
