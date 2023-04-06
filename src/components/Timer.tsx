import {FC, useEffect} from 'react';
import clsx from 'clsx';
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerTrackNextFilled,
} from 'react-icons/tb';
import {useTimer} from '@/hooks/useTimer';
import {SOUNDS} from '@/shared/constants';
import {ConfirmMessage} from '@/shared/enums';
import {updateTitle} from '@/shared/helpers';
import {AudioPlayer} from '@/shared/lib/audio-player';
import eventBus from '@/shared/lib/event-bus';
import ButtonTimer from './ButtonTimer';
import Clock from './Clock';
import ModeSwitch from './ModeSwitch';
import ProgressLinear from './ProgressLinear';

interface Props {
  minutes: number;
  mode: TimerMode;
  isLongBreak: boolean;
  isAutoFocus: boolean;
  isAutoBreaks: boolean;
  onSetMode: (newMode: TimerMode) => void;
  onIncrementRound: () => void;
}

//* set here to avoid refetch audio
const buttonAudio = new AudioPlayer({src: SOUNDS.BUTTON_PRESS});
const breakAudio = new AudioPlayer({src: SOUNDS.BELL});
const focusAudio = new AudioPlayer({src: SOUNDS.CLOCK_ALARM});

const Timer: FC<Props> = ({
  minutes,
  mode,
  onSetMode,
  onIncrementRound,
  isLongBreak,
  isAutoBreaks,
  isAutoFocus,
}) => {
  const {progress, start, pause, reset, timeLeft, isTicking, withConfirm} = useTimer({
    minutes,
    onPause: () => eventBus.pauseTimer.emit(),
    onStart: () => eventBus.startTimer.emit(),
    onComplete: () => {
      if (mode === 'focus') breakAudio.play();
      else focusAudio.play();

      nextMode();
    },
  });

  const setMode = (newMode: TimerMode) => {
    if (newMode === 'focus') eventBus.focusStart.emit();
    else eventBus.focusEnd.emit();

    reset();
    onSetMode(newMode);
  };

  const nextMode = () => {
    if (mode === 'focus') {
      setMode(isLongBreak ? 'long_break' : 'short_break');
      if (isAutoBreaks) start();
      return;
    }

    setMode('focus');
    onIncrementRound();
    if (isAutoFocus) start();
  };

  const confirmNext = () => withConfirm({msg: ConfirmMessage.Next, action: nextMode});
  const confirmSetMode = (mode: TimerMode) => {
    withConfirm({msg: ConfirmMessage.Jump, action: () => setMode(mode)});
  };

  useEffect(() => {
    updateTitle(timeLeft, mode);
  }, [mode, timeLeft]);

  const toggleTimer = () => {
    buttonAudio.play();
    isTicking ? pause() : start();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 right-0">
        <ProgressLinear
          progress={progress}
          placeholderColorClass="accent-300"
          progressColorClass="accent-500"
        />
      </div>

      <Clock seconds={timeLeft} />

      <div className="mt-8  grid grid-cols-3  gap-3 grid-rows-2 content-center justify-items-center">
        <ButtonTimer
          onClick={toggleTimer}
          className={clsx(
            'w-[144px] h-[144px] bg-accent-500 rounded-[32px] row-span-2 col-span-2',
            isTicking ? 'border-4 border-dark' : ''
          )}
        >
          {isTicking ? <TbPlayerPauseFilled size={32} /> : <TbPlayerPlayFilled size={32} />}
        </ButtonTimer>

        <ModeSwitch mode={mode} setMode={confirmSetMode} />

        <ButtonTimer onClick={confirmNext} className="col-start-3">
          <TbPlayerTrackNextFilled size={20} />
        </ButtonTimer>
      </div>
    </div>
  );
};

export default Timer;
