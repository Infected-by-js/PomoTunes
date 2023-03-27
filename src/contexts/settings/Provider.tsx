import {FC, PropsWithChildren, createContext, useEffect, useReducer} from 'react';
import {updateTheme} from '@/shared/helpers';
import {initialState} from './initialState';
import {reducer} from './reducer';
import {Action, Dispatch, State} from './types';

interface Context {
  state: State;
  dispatch: Dispatch;
}

export const SettingsContext = createContext<Context>({} as Context);

export const SettingsProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDispatch: Dispatch = (type, payload) => {
    dispatch({type, payload} as Action);
  };

  useEffect(() => {
    // TODO: GET FROM LS
    // TODO: SET TO LS
    updateTheme(state.mode, state.isDarkTheme);
  }, [state.mode, state.isDarkTheme]);

  return (
    <SettingsContext.Provider value={{state, dispatch: handleDispatch}}>
      {children}
    </SettingsContext.Provider>
  );
};
