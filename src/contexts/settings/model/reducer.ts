import produce from 'immer';
import {Action, State} from './types';

export const reducer = produce((state: State, action: Action): State => {
  const {type, payload} = action;

  switch (type) {
    case 'setMode': {
      state.mode = payload.mode;
      break;
    }

    case 'completeMode': {
      if (payload.modeCompleted !== 'focus') {
        state.mode = 'focus';
      } else {
        const focusCompleted = state.modes.focus.completed;
        const isLongBreak = focusCompleted && !(focusCompleted % state.longBreakInterval);

        state.mode = isLongBreak ? 'long_break' : 'short_break';
      }

      break;
    }

    case 'incrementModeCounter': {
      state.modes[payload.mode].completed += 1;
      break;
    }

    case 'updateModeTime': {
      state.modes[payload.mode].time = payload.time;
      break;
    }

    case 'setLongBreakInterval': {
      state.longBreakInterval = payload.interval;
      break;
    }

    case 'changeVideoId': {
      state.videoId = payload.id;
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
  }

  return state;
});
