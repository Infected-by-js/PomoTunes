import {FC, ReactNode} from 'react';
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbPlayerTrackNextFilled,
} from 'react-icons/tb';
import useTimer from '../model/useTimer';
import Clock from './Clock';
import TimerBtn from './TimerBtn';

interface Props {
  setMode: (mode: TimerMode) => void;
  children?: ReactNode;
}

const Timer: FC<Props> = () => {
  const {progress, start, pause, timeLeft, isTicking, stop} = useTimer({
    minutes: 0.1,
    onComplete: () => {
      console.log('ON COMPLETER');
    },
  });

    <>
      <Clock seconds={timeLeft} />


      <div className="mt-4  grid grid-cols-3  gap-4 grid-rows-2 ">
        <TimerBtn
          onClick={isTicking ? pause : start}
          classes={'text-5xl w-44 h-44 bg-accent-500 rounded-[32px]  row-span-2  col-span-2'}
        >
          {isTicking ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
        </TimerBtn>

        <TimerBtn
          onClick={stop}
          classes="text-3xl w-20 h-20 bg-accent-300 rounded-2xl col-start-3"
        >
          <TbPlayerStopFilled />
        </TimerBtn>

        <TimerBtn classes="text-3xl w-20 h-20 bg-accent-300 rounded-2xl col-start-3">
          <TbPlayerTrackNextFilled />
        </TimerBtn>
      </div>
    </>
  );
};

export default Timer;
