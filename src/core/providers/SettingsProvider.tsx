import {FC, PropsWithChildren, createContext, useReducer} from 'react';
import {reducer} from '@/model/settings/reducer';
import {Action, Dispatch, State} from '@/model/settings/types';

interface Context {
  state: State;
  dispatch: Dispatch;
}

const initialState: State = {
  mode: 'focus',
  isAutoBreaks: false,
  isAutoFocus: false,
  longBreakInterval: 4,
  isDarkTheme: false,

  modes: {
    focus: {
      id: 'focus',
      label: 'Focus',
      time: 25,
    },
    short_break: {
      id: 'short_break',
      label: 'Short break',
      time: 5,
    },
    long_break: {
      id: 'long_break',
      label: 'Long break',
      time: 15,
    },
  },
};

export const SettingsContext = createContext<Context>({} as Context);

export const SettingsProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDispatch: Dispatch = (type, payload) => {
    dispatch({type, payload} as Action);
  };

  return (
    <SettingsContext.Provider value={{state, dispatch: handleDispatch}}>
      {children}
    </SettingsContext.Provider>
  );
};
