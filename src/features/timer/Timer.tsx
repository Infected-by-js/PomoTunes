import {FC, useEffect} from 'react';
import clsx from 'clsx';
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerTrackNextFilled,
} from 'react-icons/tb';
import {ProgressLinear} from '@/shared/components';
import {AudioPlayer} from '@/shared/lib/audio-player';
import eventBus from '@/shared/lib/event-bus';
import {Notifications} from '@/shared/lib/notifications';
import {IMAGES, SOUNDS} from '@/shared/utils/constants';
import {ConfirmMessage} from '@/shared/utils/enums';
import {updateTitle} from '@/shared/utils/helpers';
import Button from './components/Button';
import Clock from './components/Clock';
import ModeSwitch from './components/ModeSwitch';
import {useTimer} from './hooks/useTimer';

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

const notifications = Notifications();

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

      notifications.showNotification(
        mode === 'focus' ? 'Time for a break!' : 'Time to focus!',
        {icon: IMAGES.NOTIFICATION}
      );

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
        <Button
          onClick={toggleTimer}
          className={clsx(
            'w-32 h-32 bg-accent-500 rounded-3xl row-span-2 col-span-2',
            isTicking ? 'border-4 border-dark dark:border-light' : ''
          )}
        >
          {isTicking ? <TbPlayerPauseFilled size={32} /> : <TbPlayerPlayFilled size={32} />}
        </Button>

        <ModeSwitch mode={mode} setMode={confirmSetMode} />

        <Button onClick={confirmNext} className="w-14 h-14 rounded-xl col-start-3">
          <TbPlayerTrackNextFilled size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
