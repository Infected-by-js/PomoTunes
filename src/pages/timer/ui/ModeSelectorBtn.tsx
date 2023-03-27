import {FC, forwardRef} from 'react';
import {IconType} from 'react-icons';

interface Props {
  Icon: IconType;
  mode: string;
}

const ModeSelectorBtn: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({mode, Icon, ...props}, ref) => {
    return (
      <button
        ref={ref}
        className={
          'rounded-3xl px-4 py-2 text-xl flex gap-2 items-center bg-accent-300 dark:bg-accent-700  border-solid border-2 hover:translate-y-[-1px] hover:drop-shadow-md active:translate-y-0  text-dark dark:text-light border-accent-700  hover:shadow-dark  dark:border-accent-300  dark:hover:shadow-light transition-all ease-in duration-100'
        }
        {...props}
      >
        <Icon className="text-3xl" />
        {mode}
      </button>
    );
  }
);

export default ModeSelectorBtn;
