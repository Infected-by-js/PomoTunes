import {secondsToTime} from './utils';

export const updateTitle = (seconds: number, mode: TimerMode) => {
  const {mm, ss} = secondsToTime(seconds);
  const message = mode === 'focus' ? 'Time to focus!' : 'Time to break!';

  document.title = `${mm}:${ss} - ${message} | PomoTunes`;
};

export const updateTheme = (mode: TimerMode, isDarkTheme: boolean) => {
  document.documentElement.dataset.theme = mode;
  document.documentElement.dataset.mode = isDarkTheme ? 'dark' : 'light';
};
