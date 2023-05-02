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
        'flex justify-center items-center p-2 text-[64px] leading-none font-bold  bg-black/75 text-white  rounded-lg '
      }
    >
      {mm}:{ss}
    </div>
  );
};

export default Clock;
