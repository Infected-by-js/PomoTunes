import {State} from './types';

export const initialState: State = {
  mode: 'focus',
  videoId: 'wkhLHTmS_GI',
  isAutoBreaks: true,
  isAutoFocus: true,
  longBreakInterval: 4,
  isDarkTheme: false,
  round: 1,

  modes: {
    focus: {
      id: 'focus',
      label: 'Focus',
      time: 0.2,
    },
    short_break: {
      id: 'short_break',
      label: 'Short break',
      time: 0.1,
    },
    long_break: {
      id: 'long_break',
      label: 'Long break',
      time: 0.15,
    },
  },
};
