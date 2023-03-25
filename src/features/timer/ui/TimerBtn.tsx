import {FC, HTMLAttributes, HTMLProps, ReactNode} from 'react';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  active?: boolean;
  classes?: HTMLProps<HTMLElement>['className'];
}

const TimerBtn: FC<Props> = ({classes, active, children, ...rest}) => {
  return (
    <button
      className={clsx(
        'text-dark flex items-center justify-center bg-accent-300 rounded-2xl  hover:translate-y-[-1px] hover:drop-shadow-sm active:translate-y-0 active:shadow-none   hover:shadow-dark dark:bg-accent-700   dark:hover:shadow-light transition-all ease-in duration-100',
        classes,
        active ? 'border-4 border-dark' : ''
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TimerBtn;
