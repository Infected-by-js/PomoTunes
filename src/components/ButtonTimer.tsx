import {HTMLProps, ReactNode, forwardRef} from 'react';
import clsx from 'clsx';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  className?: HTMLButtonElement['className'];
}

const ButtonTimer = forwardRef<HTMLButtonElement, Props>(
  ({children, className, ...rest}, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'text-dark flex items-center w-16 h-16 bg-accent-300 dark:bg-accent-700 rounded-2xl justify-center  hover:translate-y-[-1px] hover:drop-shadow-sm active:scale-95 active:shadow-none   hover:shadow-dark   dark:hover:shadow-light transition-all ease-in duration-100',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default ButtonTimer;
