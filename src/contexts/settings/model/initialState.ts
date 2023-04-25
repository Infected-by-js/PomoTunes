import {State} from '../model/types';

export const initialState: State = {
  mode: 'focus',
  videoId: 'wkhLHTmS_GI',
  isAutoBreaks: true,
  isAutoFocus: true,
  longBreakInterval: 4,
  isDarkTheme: false,

  modes: {
    focus: {
      id: 'focus',
      label: 'Focus',
      time: 0.1,
      color: '#ffa6d3',
      completed: 0,
    },
    short_break: {
      id: 'short_break',
      label: 'Short break',
      time: 0.1,
      color: '#bde3b5',
      completed: 0,
    },
    long_break: {
      id: 'long_break',
      label: 'Long break',
      time: 0.2,
      color: '#a6d3ff',
      completed: 0,
    },
  },
};
