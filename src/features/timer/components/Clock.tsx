import {FC} from 'react';
import {secondsToMinutes} from '@/shared/utils/time-utils';

interface Props {
  seconds: number;
}

const Clock: FC<Props> = ({seconds}) => {
  const {mm, ss} = secondsToMinutes(seconds);

  return (
    <div
      className={
        'text-8xl leading-none  flex flex-col items-center font-bold text-dark dark:text-light pointer-events-none transition-colors duration-200 ease'
      }
    >
      {mm}:{ss}
    </div>
  );
};

export default Clock;
