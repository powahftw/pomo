import { useContext } from 'react';
import { Moon, Sun } from 'react-feather';
import { ThemeContext, ThemeDispatchContext } from '../../context/Theme/ThemeContext';
import { Theme } from '../../types/themes';

export default function Navbar() {
  const theme = useContext(ThemeContext);
  const dispatchTheme = useContext(ThemeDispatchContext);

  const handleSetTheme = () => {
    dispatchTheme({ newTheme: theme.currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK });
  };

  return (
    <div className="flex justify-end w-full p-4">
      <button type="button" onClick={handleSetTheme}>
        {theme.currentTheme === Theme.LIGHT
          ? <Moon />
          : <Sun color="white" />}
      </button>
    </div>
  );
}
