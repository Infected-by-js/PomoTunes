import {FC, HTMLProps} from 'react';
import clsx from 'clsx';
import {IconType} from 'react-icons';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  icon: IconType;
  className?: string;
}

const Button: FC<Props> = ({icon: Icon, className, ...rest}) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center p-[6px]  outline-none   bg-black/75 text-white  rounded-lg hover:bg-black/90 transition-color duration-150 ease-in-out',
        className,
        rest.disabled ? 'bg-black/70 text-white/70 hover:bg-black/70' : ''
      )}
      {...rest}
    >
      <Icon size={22} />
    </button>
  );
};

export default Button;
