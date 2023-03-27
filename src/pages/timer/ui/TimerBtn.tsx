import {FC, HTMLAttributes, ReactNode} from 'react';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const TimerBtn: FC<Props> = ({children, className, ...rest}) => {
  return (
    <button
      className={clsx(
        'text-dark flex items-center text-3xl w-20 h-20 bg-accent-300 rounded-2xl justify-center  hover:translate-y-[-1px] hover:drop-shadow-sm active:translate-y-0 active:shadow-none   hover:shadow-dark dark:bg-accent-700   dark:hover:shadow-light transition-all ease-in duration-100',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TimerBtn;
