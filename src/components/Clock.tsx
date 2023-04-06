import {FC} from 'react';
import {secondsToMinutes} from '@/shared/utils';

interface Props {
  seconds: number;
}

const Clock: FC<Props> = ({seconds}) => {
  const {mm, ss} = secondsToMinutes(seconds);

  return (
    <div
      className={
        'text-[180px] leading-[85%] flex flex-col items-center font-normal text-dark dark:text-light pointer-events-none'
      }
    >
      <span>{mm}</span>
      <span>{ss}</span>
    </div>
  );
};

export default Clock;
