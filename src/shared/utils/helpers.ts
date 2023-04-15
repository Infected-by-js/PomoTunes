import {secondsToTime} from './time-utils';

export const updateTitle = (seconds: number, mode: TimerMode) => {
  const {mm, ss} = secondsToTime(seconds);
  const message = mode === 'focus' ? 'Time to focus!' : 'Time for a break!';

  document.title = `${mm}:${ss} - ${message} | PomoTunes`;
};

export const updateTheme = (mode: TimerMode, isDarkTheme: boolean) => {
  document.documentElement.dataset.theme = mode;
  document.documentElement.dataset.mode = isDarkTheme ? 'dark' : 'light';
};

export const generateBackgroundGradient = ({
  color,
  min,
  max,
  value,
}: {
  color: string;
  min: number;
  max: number;
  value: number;
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return `linear-gradient(to right, ${color} ${percentage}%, rgba(0, 0, 0, 0.1) ${percentage}%)`;
};
