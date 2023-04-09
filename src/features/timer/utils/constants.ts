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
