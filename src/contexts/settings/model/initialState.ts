import {State} from '../model/types';

export const initialState: State = {
  mode: 'focus',
  isAutoBreaks: true,
  isAutoFocus: true,
  longBreakInterval: 4,

  videoId: 'Na0w3Mz46GA',

  modes: {
    focus: {
      id: 'focus',
      label: 'Focus',
      time: 25,
      completed: 0,
    },
    short_break: {
      id: 'short_break',
      label: 'Short break',
      time: 5,
      completed: 0,
    },
    long_break: {
      id: 'long_break',
      label: 'Long break',
      time: 15,
      completed: 0,
    },
  },
};
