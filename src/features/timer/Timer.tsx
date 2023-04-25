import {FC, useEffect} from 'react';
import clsx from 'clsx';
import {
  TbAdjustmentsHorizontal,
  TbBrain,
  TbBrandYoutube,
  TbCoffee,
  TbPlant,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipForwardFilled,
  TbVolume,
} from 'react-icons/tb';
import {ModeSettings} from '@/contexts/settings';
import {Button} from '@/shared/components';
import {AudioPlayer} from '@/shared/lib/audio-player';
import eventBus from '@/shared/lib/event-bus';
import {Notifications} from '@/shared/lib/notifications';
import {IMAGES, SOUNDS} from '@/shared/utils/constants';
import {updateTitle} from '@/shared/utils/helpers';
import ProgressChip from '../../components/ProgressCountersBtn';
import Clock from './components/Clock';
import {useTimer} from './hooks/useTimer';

interface Props {
  minutes: number;
  mode: TimerMode;
  modes: ModeSettings;
  isLongBreak: boolean;
  isAutoFocus: boolean;
  isAutoBreaks: boolean;
  onSetMode: (newMode: TimerMode) => void;
  onIncrementRound: () => void;
}

//* set here to avoid refetch audio
const buttonAudio = new AudioPlayer({src: SOUNDS.BUTTON_PRESS});
const breakAudio = new AudioPlayer({src: SOUNDS.SOUND_1});
const focusAudio = new AudioPlayer({src: SOUNDS.BELL});

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
  const {timerState, toggle, start} = useTimer({
    minutes,
    mode,
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

  const nextMode = () => {
    if (mode === 'focus') setMode(isLongBreak ? 'long_break' : 'short_break');
    else setMode('focus');
  };

  const setMode = (newMode: TimerMode) => {
    onSetMode(newMode);

    if (newMode === 'focus') {
      eventBus.focusStart.emit();

      onIncrementRound();
      if (isAutoFocus) start();
      return;
    }

    eventBus.focusEnd.emit();
    if (isAutoBreaks) start();
  };

  useEffect(() => {
    updateTitle(timerState.timeLeft, mode);
  }, [mode, timerState.timeLeft]);

  const toggleTimer = () => {
    buttonAudio.play();
    toggle();
  };

  const checkIsActive = (currentMode: TimerMode) => {
    return mode === currentMode;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 space-x-6 flex items-center justify-center">
        <ProgressChip
          value={checkIsActive('focus') ? timerState.progress : 0}
          isActive={checkIsActive('focus')}
        >
          {/* {state.modes.focus.completed} */}
          <TbBrain size={24} className="ml-2" />
        </ProgressChip>

        <ProgressChip
          value={checkIsActive('short_break') ? timerState.progress : 0}
          isActive={checkIsActive('short_break')}
        >
          {/* {state.modes.short_break.completed} */}
          <TbCoffee size={24} className="ml-2" />
        </ProgressChip>

        <ProgressChip
          value={checkIsActive('long_break') ? timerState.progress : 0}
          isActive={checkIsActive('long_break')}
        >
          {/* {state.modes.long_break.completed} */}
          <TbPlant size={24} className="ml-2" />
        </ProgressChip>
      </div>

      <div className={clsx('mb-5 inline-flex items-center justify-center  w-[440px]')}>
        <hr className={clsx('w-full h-[2px] my-4 border-0 bg-dark font-light')} />
        <span
          className={
            'absolute px-6 flex bg-accent-100 dark:bg-accent-900 items-center text-xl text-dark -translate-x-1/2 left-1/2'
          }
        >
          <TbBrain size={24} className="mr-3" />
          Time to Focus
        </span>
      </div>

      <Clock seconds={timerState.timeLeft} />

      <div className="mt-5 flex items-center content-center space-x-2">
        <Button className={'w-10 h-10 bg-accent-100'}>
          <TbBrandYoutube size={20} />
        </Button>
        <Button className={'w-10 h-10 bg-accent-100'}>
          <TbAdjustmentsHorizontal size={20} />
        </Button>
        <Button
          onClick={toggleTimer}
          className={clsx(
            'w-16 h-16 bg-accent-500',
            timerState.isTicking ? 'border-4 border-dark dark:border-light' : ''
          )}
        >
          {timerState.isTicking ? (
            <TbPlayerPauseFilled size={30} />
          ) : (
            <TbPlayerPlayFilled size={30} />
          )}
        </Button>
        <Button className={'w-10 h-10 bg-accent-100'}>
          <TbPlayerSkipForwardFilled size={20} />
        </Button>
        <Button className={'w-10 h-10 bg-accent-100'}>
          <TbVolume size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
