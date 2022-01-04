import { Moon, Sun } from 'react-feather';
import { useEffect } from 'react';
import { Theme } from '../../types/themes';
import { ActionType } from '../../store/preference';

import { usePreference } from '../../providers/preference-context';

export default function ThemePicker() {
  const {
    state: { 'color-theme': currTheme },
    dispatch,
  } = usePreference();

  const isCurrThemeLight = currTheme === Theme.LIGHT;

  useEffect(() => {
    document.body.dataset.theme = currTheme;
  }, [currTheme]);

  const changeTheme = () => {
    const nextTheme = isCurrThemeLight ? Theme.DARK : Theme.LIGHT;
    dispatch({
      type: ActionType.UPDATE_PREFERENCE,
      newPreferences: { 'color-theme': nextTheme },
    });
  };

  return (
    <button type="button" onClick={changeTheme}>
      {isCurrThemeLight ? (
        <Moon size={28} />
      ) : (
        <Sun color="var(--hc-color)" size={28} />
      )}
    </button>
  );
}
