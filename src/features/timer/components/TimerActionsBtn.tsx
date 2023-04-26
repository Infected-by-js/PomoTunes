import {FC, HTMLProps, ReactNode} from 'react';
import clsx from 'clsx';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  children?: ReactNode;
  className?: HTMLButtonElement['className'];
}

const TimerActionsBtn: FC<Props> = ({children, className, isDisabled, ...rest}) => {
  return (
    <button
      disabled={isDisabled}
      className={clsx(
        `rounded-full 
        flex items-center justify-center 
        outline-none border-2  border-dark 
        text-dark 
        transition-all ease-in duration-100`,
        className,
        isDisabled
          ? 'opacity-50'
          : 'hover:translate-y-[-1px] hover:drop-shadow-sm active:scale-95 active:shadow-none   hover:shadow-dark'
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TimerActionsBtn;
