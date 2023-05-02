import {State} from '../model/types';

export const initialState: State = {
  mode: 'focus',
  videoId: 'wkhLHTmS_GI',
  isAutoBreaks: false,
  isAutoFocus: false,
  longBreakInterval: 4,
  isDarkTheme: false,

  modes: {
    focus: {
      id: 'focus',
      label: 'Focus',
      time: 0.1,
      completed: 0,
    },
    short_break: {
      id: 'short_break',
      label: 'Short break',
      time: 0.1,
      completed: 0,
    },
    long_break: {
      id: 'long_break',
      label: 'Long break',
      time: 0.2,
      completed: 0,
    },
  },
};
