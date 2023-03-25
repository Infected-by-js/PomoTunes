import {FC, useEffect} from 'react';
import {useSettings} from '@/hooks/useSettings';

interface Props {}

const Timer: FC<Props> = () => {
  const {state, dispatch} = useSettings();

  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <div className="flex flex-col items-center ">
      {/*
      <Clock seconds={seconds} classes="mb-12" />
      <Actions
        timerState={timerState}
        togglePauseTimer={togglePauseTimer}
        stopTimer={stopTimer}
        toNextMode={toNextMode}
      /> */}
    </div>
  );
};

export default Timer;
