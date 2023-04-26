import {IconType} from 'react-icons';
import {TbBrain, TbCoffee, TbPlant} from 'react-icons/tb';

export const MODE_ICON: Record<TimerMode, IconType> = {
  focus: TbBrain,
  short_break: TbCoffee,
  long_break: TbPlant,
};
