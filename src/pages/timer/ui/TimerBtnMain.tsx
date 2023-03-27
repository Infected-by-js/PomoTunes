import {FC, HTMLAttributes} from 'react';
import clsx from 'clsx';
import {TbPlayerPauseFilled, TbPlayerPlayFilled} from 'react-icons/tb';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const TimerBtnMain: FC<Props> = ({isActive, className, ...rest}) => {
  return (
    <button
      className={clsx(
        'text-dark flex items-center justify-center  hover:translate-y-[-1px] hover:drop-shadow-sm active:translate-y-0 active:shadow-none   hover:shadow-dark dark:bg-accent-700   dark:hover:shadow-light transition-all ease-in duration-100 text-5xl w-44 h-44 bg-accent-500 rounded-[32px]',
        className,
        isActive ? 'border-4 border-dark' : ''
      )}
      {...rest}
    >
      {isActive ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
    </button>
  );
};

export default TimerBtnMain;
