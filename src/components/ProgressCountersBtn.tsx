import {FC, HTMLProps, ReactNode} from 'react';
import clsx from 'clsx';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  value: number;
  isActive?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
}

const ProgressCountersBtn: FC<Props> = ({children, isActive, isDisabled, value, ...rest}) => {
  const bgColor = isActive ? 'accent-300' : 'accent-100';
  const color = isActive ? 'accent-500' : 'accent-100';

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        'relative outline-none px-1 w-24 h-9 rounded-full flex items-center justify-center border-2  border-dark text-dark text-xl overflow-hidden transition-all ease-in duration-100',
        isDisabled
          ? ''
          : 'hover:translate-y-[-1px] hover:drop-shadow-sm active:scale-95 active:shadow-none   hover:shadow-dark',
        `bg-${bgColor}`
      )}
      {...rest}
    >
      <div
        className={clsx(
          'absolute left-0 top-0 h-full transition-all duration-200 ease-in-out',
          `bg-${color}`
        )}
        style={{width: `${value}%`}}
      />
      <span className="relative flex items-center justify-center">{children}</span>
    </button>
  );
};

export default ProgressCountersBtn;
