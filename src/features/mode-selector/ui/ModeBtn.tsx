import {FC, forwardRef} from 'react';
import {MODE_ICON} from '../model/constants';
import {capitalize} from '@/utils/strings';

interface Props {
  mode: TimerMode;
}

const ModeBtn: FC<Props> = forwardRef<HTMLButtonElement, Props>(({mode, ...props}, ref) => {
  const Icon = MODE_ICON[mode];
  const title = capitalize(mode.replace('_', ' '));

  return (
    <button
      ref={ref}
      className={
        'rounded-3xl px-4 py-2 text-xl flex gap-2 items-center bg-accent-300 dark:bg-accent-700  border-solid border-2 hover:translate-y-[-1px] hover:shadow-sm active:translate-y-0  text-dark dark:text-light border-accent-700  hover:shadow-dark  dark:border-accent-300  dark:hover:shadow-light transition-all ease-in duration-100'
      }
      {...props}
    >
      <Icon className="text-3xl" />
      {title}
    </button>
  );
});

export default ModeBtn;
