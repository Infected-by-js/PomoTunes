import {FC, ReactNode, useEffect} from 'react';
import {TbPlayerStopFilled, TbPlayerTrackNextFilled} from 'react-icons/tb';
import {useSettings} from '@/hooks/useSettings';
import {ConfirmMessage} from '@/shared/enums';
import {updateTitle} from '@/shared/helpers';
import ProgressLinear from '@/shared/ui/ProgressLinear';
import {useTimer} from '../model/useTimer';
import Clock from './Clock';
import ModeSelector from './ModeSelector';
import TimerBtn from './TimerBtn';
import TimerBtnMain from './TimerBtnMain';

interface Props {
  children?: ReactNode;
}

const TimerPage: FC<Props> = () => {
  const {state, dispatch} = useSettings();
  const {progress, start, pause, reset, timeLeft, isTicking, withConfirm} = useTimer({
    minutes: state.modes[state.mode].time,
    onComplete: () => {
      nextMode();
    },
  });

  const setMode = (mode: TimerMode) => {
    reset();
    dispatch('setMode', {mode});
  };

  const nextMode = () => {
    if (state.mode === 'focus') {
      setMode(!(state.round % state.longBreakInterval) ? 'long_break' : 'short_break');
      if (state.isAutoBreaks) start();
      return;
    }

    setMode('focus');
    dispatch('incrementRound');
    if (state.isAutoFocus) start();
  };

  const confirmNext = () => withConfirm({msg: ConfirmMessage.Next, action: nextMode});
  const confirmReset = () => {
    withConfirm({msg: ConfirmMessage.Reset, action: () => reset(true)});
  };
  const confirmJump = (mode: TimerMode) => {
    withConfirm({msg: ConfirmMessage.Jump, action: () => setMode(mode)});
  };

  useEffect(() => {
    updateTitle(timeLeft, state.mode);
  }, [state.mode, timeLeft]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0">
        <ProgressLinear
          progress={progress}
          placeholderColorClass="accent-300"
          progressColorClass="accent-500"
        />
      </div>

      <ModeSelector mode={state.modes[state.mode]} setMode={confirmJump} />

      <Clock seconds={timeLeft} />

      <div className="mt-4  grid grid-cols-3  gap-4 grid-rows-2 ">
        <TimerBtnMain
          onClick={isTicking ? pause : start}
          isActive={isTicking}
          className="row-span-2 col-span-2"
        />

        <TimerBtn onClick={confirmReset} className="col-start-3">
          <TbPlayerStopFilled />
        </TimerBtn>

        <TimerBtn onClick={confirmNext} className="col-start-3">
          <TbPlayerTrackNextFilled />
        </TimerBtn>
      </div>
    </>
  );
};

export default TimerPage;
