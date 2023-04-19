import {useEffect, useReducer} from 'react';
import {initialState} from '../model/initialState';
import {reducer} from '../model/reducer';
import {Action, Dispatch, State} from '../model/types';

const KEY = 'settings';

export const initializer = (initialValue = initialState): State => {
  const item = localStorage.getItem(KEY);

  return item ? JSON.parse(item) : initialValue;
};

export const useSettingsReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  const handleDispatch: Dispatch = (type, payload) => {
    dispatch({type, payload} as Action);
  };

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  return [state, handleDispatch] as const;
};
