import {FC, HTMLAttributes, HTMLProps, ReactNode} from 'react';
import cn from 'classnames';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  active?: boolean;
  classes?: HTMLProps<HTMLElement>['className'];
}

const ActionsButton: FC<Props> = ({classes, active, children, ...rest}) => {
  return (
    <button
      className={cn(
        'text-dark flex items-center justify-center bg-accent-300 rounded-2xl  hover:translate-y-[-2px] hover:shadow-sm active:translate-y-0 active:shadow-none   hover:shadow-dark dark:bg-accent-700   dark:hover:shadow-light transition-all ease-in duration-100',
        classes,
        active ? 'border-4 border-dark' : ''
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ActionsButton;
