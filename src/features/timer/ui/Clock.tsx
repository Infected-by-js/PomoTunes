import {FC, HTMLProps} from 'react';
import clsx from 'clsx';
import {secondsToMinutes} from '@/utils/time';

interface Props {
  seconds: number;
  classes?: HTMLProps<HTMLElement>['className'];
}

const Clock: FC<Props> = ({seconds, classes}) => {
  const {mm, ss} = secondsToMinutes(seconds);

  return (
    <div
      className={clsx(
        classes,
        'text-[256px] leading-[85%] flex flex-col items-center font-normal text-dark dark:text-light pointer-events-none'
      )}
    >
      <span>{mm}</span>
      <span>{ss}</span>
    </div>
  );
};

export default Clock;
