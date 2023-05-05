import {POMODORO_MSG} from './constants';
import {secondsToTime} from './time-utils';

export const updateTitle = (seconds: number, mode: TimerMode) => {
  const {mm, ss} = secondsToTime(seconds);
  const message = mode === 'focus' ? POMODORO_MSG.FOCUS : POMODORO_MSG.BREAK;

  document.title = `${mm}:${ss} - ${message}! | PomoTunes`;
};

export const generateBackgroundGradient = ({
  bgColor = 'rgba(255,255,255,0.1)',
  color,
  min,
  max,
  value,
}: {
  bgColor?: string;
  color: string;
  min: number;
  max: number;
  value: number;
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return `linear-gradient(to right, ${color} ${percentage}%, ${bgColor} ${percentage}%)`;
};
