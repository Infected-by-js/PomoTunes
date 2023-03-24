import {FC, HTMLProps} from 'react';
import cn from 'classnames';
import {IconType} from 'react-icons';
import {TbBrain, TbCoffee, TbDotsVertical, TbPlant} from 'react-icons/tb';
import {capitalize} from '@/utils/strings';

const MODE_ICON: Record<TimerMode, IconType> = {
  focus: TbBrain,
  short_break: TbCoffee,
  long_break: TbPlant,
};

interface Props {
  mode: TimerMode;
  classes?: HTMLProps<HTMLElement>['className'];
}

interface StatusItem {
  icon: IconType;
  name: TimerMode;
  shortcut: string;
}

const Mode: FC<Props> = ({mode, classes}) => {
  const Icon = MODE_ICON[mode];
  const statusTitle = capitalize(mode.replace('_', ' '));

  return (
    <div className={cn('flex justify-center', classes)}>
      <button
        className={
          'rounded-2xl px-4 py-2 mr-6 text-xl flex gap-2 items-center  border-solid border-2 hover:translate-y-[-2px] hover:shadow-sm active:translate-y-0  text-dark dark:text-light border-accent-700  hover:shadow-dark  dark:border-accent-300  dark:hover:shadow-light transition-all ease-in duration-100'
        }
      >
        <Icon className="text-3xl" />
        {statusTitle}
      </button>

      <button
        className={
          'rounded-2xl px-4 py-4 flex-grow-0  text-xl flex gap-2 flex-1 items-center  border-solid border-2 hover:translate-y-[-2px] hover:shadow-sm active:translate-y-0  text-dark dark:text-light  hover:shadow-dark  dark:hover:shadow-light transition-all ease-in duration-100'
        }
      >
        <TbDotsVertical />
      </button>

      {/* <Popup>
  { StatusesList.map((item) => ( <StatusItem onClick={() => setTimerStatus(item)} /> )) }
</Popup> */}
    </div>
  );
};

export default Mode;
