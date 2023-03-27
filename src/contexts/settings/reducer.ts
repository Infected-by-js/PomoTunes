import produce from 'immer';
import {Action, State} from './types';

export const reducer = produce((state: State, action: Action): State => {
  const {type, payload} = action;

  switch (type) {
    case 'setMode': {
      state.mode = payload.mode;
      break;
    }

    case 'updateModeTime': {
      state.modes[payload.mode].time = payload.time;
      break;
    }

    case 'toggleAutoBreaks': {
      state.isAutoBreaks = !state.isAutoBreaks;
      break;
    }

    case 'toggleAutoStarts': {
      state.isAutoFocus = !state.isAutoFocus;
      break;
    }

    case 'toggleDarkTheme': {
      state.isDarkTheme = !state.isDarkTheme;
      break;
    }

    case 'setLongBreakInterval': {
      state.longBreakInterval = payload.longBreakInterval;
      break;
    }

    case 'incrementRound': {
      state.round += 1;
      break;
    }
  }

  return state;
});
