import {FC} from 'react';
import {IconType} from 'react-icons';
import {TbBrain, TbCoffee, TbPlant} from 'react-icons/tb';
import {POMODORO_MSG} from '@/shared/utils/constants';

interface Props {
  mode: TimerMode;
}

export const MODE_ICON: Record<TimerMode, IconType> = {
  focus: TbBrain,
  short_break: TbCoffee,
  long_break: TbPlant,
};

const TimerStateMsg: FC<Props> = ({mode}) => {
  const Icon = MODE_ICON[mode];

  return (
    <div className={'relative inline-flex items-center justify-center  w-[440px]'}>
      <hr className={'w-full h-[2px] my-4 border-0 bg-dark font-light'} />
      <span
        className={
          'absolute whitespace-nowrap px-6 flex bg-accent-100 dark:bg-accent-900 items-center text-xl text-dark -translate-x-1/2 left-1/2'
        }
      >
        <Icon size={24} className="mr-3" />

        {mode === 'focus' ? POMODORO_MSG.FOCUS : POMODORO_MSG.BREAK}
      </span>
    </div>
  );
};

export default TimerStateMsg;
