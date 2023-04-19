import {FC, PropsWithChildren, createContext, useEffect} from 'react';
import {updateTheme} from '@/shared/utils/helpers';
import {useSettingsReducer} from './hooks/useSettingsReducer';
import {Dispatch, State} from './model/types';

interface Context {
  state: State;
  dispatch: Dispatch;
}

export const SettingsContext = createContext<Context>({} as Context);

export const SettingsProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useSettingsReducer();

  useEffect(() => {
    updateTheme(state.mode, state.isDarkTheme);
  }, [state.mode, state.isDarkTheme]);

  return (
    <SettingsContext.Provider value={{state, dispatch}}>{children}</SettingsContext.Provider>
  );
};
