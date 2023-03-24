import {FC, HTMLProps} from 'react';
import cn from 'classnames';
import {secondsToMinutes} from '@/utils/time';

interface Props {
  seconds: number;
  classes?: HTMLProps<HTMLElement>['className'];
}

const Clock: FC<Props> = ({seconds, classes}) => {
  const {mm, ss} = secondsToMinutes(seconds);

  return (
    <div
      className={cn(
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
