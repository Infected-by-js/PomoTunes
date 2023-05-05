import {FC} from 'react';
import {IconType} from 'react-icons';
import {TbBrain, TbCoffee, TbPlant} from 'react-icons/tb';
import {POMODORO_MSG} from '@/shared/utils/constants';

interface Props {
  value: number;
  mode: TimerMode;
}

const MODE_ICON: Record<TimerMode, IconType> = {
  focus: TbBrain,
  short_break: TbCoffee,
  long_break: TbPlant,
};

const StateMsg: FC<Props> = ({value, mode}) => {
  const Icon = MODE_ICON[mode];

  return (
    <div
      className={
        'relative px-2 py-1  overflow-hidden flex items-center justify-center outline-none bg-black/75 text-white  rounded-lg transition-color duration-150 ease-in-out'
      }
    >
      <div
        className={
          'absolute left-0 top-0 h-full transition-all duration-200 ease-in-out bg-primary/80'
        }
        style={{width: `${value}%`}}
      />
      <span className="gap-2 leading-5 relative flex items-center justify-center text-xl font-bold">
        <Icon size={24} />
        {mode === 'focus' ? POMODORO_MSG.FOCUS : POMODORO_MSG.BREAK}!
      </span>
    </div>
  );
};

export default StateMsg;
