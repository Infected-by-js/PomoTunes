import {IconType} from 'react-icons';
import {TbBrain, TbCoffee, TbPlant} from 'react-icons/tb';
import {ModeItem} from './types';

export const modeItems: ModeItem[] = [
  {name: 'focus', Icon: TbBrain},
  {name: 'short_break', Icon: TbCoffee},
  {name: 'long_break', Icon: TbPlant},
];

export const MODE_ICON: Record<TimerMode, IconType> = {
  focus: TbBrain,
  short_break: TbCoffee,
  long_break: TbPlant,
};

export const SOUNDS = {
  BUTTON_PRESS: 'sounds/button-press.mp3',
  BELL: 'sounds/alert-bell.mp3',
  NOTIFICATION: 'sounds/notification.mp3',
  CLOCK_ALARM: 'sounds/clock-alarm.mp3',
};
