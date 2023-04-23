import {FC, HTMLProps, ReactNode} from 'react';
import clsx from 'clsx';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  className?: HTMLButtonElement['className'];
}

const Button: FC<Props> = ({children, className, ...rest}) => {
  return (
    <button
      className={clsx(
        `rounded-full 
        flex items-center justify-center 
        outline-none border-2  border-dark 
        text-dark 
        transition-colors ease-in duration-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
