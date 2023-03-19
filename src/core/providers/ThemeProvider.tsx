import {FC, PropsWithChildren, createContext, useEffect, useState} from 'react';

interface Scheme {
  theme: TimerStatus;
  isDarkMode: boolean;
}

interface Context extends Scheme {
  toggleDarkMode: () => void;
  changeTheme: (theme: TimerStatus) => void;
}

interface Props extends PropsWithChildren {}

export const ThemeContext = createContext<Context>({} as Context);

export const ThemeProvider: FC<Props> = ({children}) => {
  const [scheme, setScheme] = useState<Scheme>({theme: 'long_break', isDarkMode: false});

  const changeSchema = (params: Partial<Scheme>) => {
    setScheme((prev) => ({...prev, ...params}));

    // TODO: set to LS
  };

  const changeTheme = (theme: TimerStatus) => changeSchema({theme});
  const toggleDarkMode = () => changeSchema({isDarkMode: !scheme.isDarkMode});

  useEffect(() => {
    // TODO: get from LS
    console.log('Get theme config from LS');

    document.documentElement.dataset.theme = scheme.theme;
    document.documentElement.dataset.mode = scheme.isDarkMode ? 'dark' : 'light';
  }, [scheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: scheme.theme,
        isDarkMode: scheme.isDarkMode,
        toggleDarkMode,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
