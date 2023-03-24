import {FC, useEffect} from 'react';
import {useSettings} from '@/hooks/useSettings';
import Mode from './Mode';

interface Props {}

const Timer: FC<Props> = () => {
  const {state, dispatch} = useSettings();

  useEffect(() => {
    console.log(state);
  }, []);

  const setMode = () => {
    dispatch('setMode', {mode: state.mode === 'focus' ? 'short_break' : 'focus'});
  };

  const toNextMode = () => {};

  return (
    <div className="flex flex-col items-center ">
      <Mode mode={state.mode} classes="my-16" />
      <button onClick={setMode}>mode</button>

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
