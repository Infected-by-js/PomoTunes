import {FC, PropsWithChildren, createContext} from 'react';
import {useSettingsReducer} from './hooks/useSettingsReducer';
import {Dispatch, State} from './model/types';

interface Context {
  state: State;
  dispatch: Dispatch;
}

export const SettingsContext = createContext<Context>({} as Context);

export const SettingsProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useSettingsReducer();

  return (
    <SettingsContext.Provider value={{state, dispatch}}>{children}</SettingsContext.Provider>
  );
};
