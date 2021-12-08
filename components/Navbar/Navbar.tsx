import { useReducer } from 'react';
import { Moon, Sun } from 'react-feather';
import { Theme } from '../../types/themes';
import { DEFAULT_THEME, themeReducer } from '../../store/theme';

export default function Navbar() {
  const [theme, dispatchTheme] = useReducer(themeReducer, DEFAULT_THEME);

  const handleSetTheme = () => {
    const newTheme = { newTheme: theme.currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK };
    return dispatchTheme(newTheme);
  };

  return (
    <div className="flex justify-between w-full p-4">
      <div> </div>
      <div>
        <button type="button" onClick={handleSetTheme}>{theme.currentTheme === Theme.LIGHT ? <Moon /> : <Sun color="white" />}</button>
      </div>
    </div>
  );
}
