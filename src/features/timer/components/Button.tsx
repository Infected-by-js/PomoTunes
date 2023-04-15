import {HTMLProps, ReactNode, forwardRef} from 'react';
import clsx from 'clsx';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  className?: HTMLButtonElement['className'];
}

const Button = forwardRef<HTMLButtonElement, Props>(({children, className, ...rest}, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'text-dark flex items-center  bg-accent-300 dark:bg-accent-700  justify-center  hover:translate-y-[-1px] hover:drop-shadow-sm active:scale-95 active:shadow-none   hover:shadow-dark   dark:hover:shadow-light transition-all ease-in duration-100',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
