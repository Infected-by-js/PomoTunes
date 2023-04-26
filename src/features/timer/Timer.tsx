import {FC, useEffect} from 'react';
import {ModesSettings} from '@/contexts/settings';
import ProgressCounters from '@/features/timer/components/ProgressCounters';
import TimerActions from '@/features/timer/components/TimerActions';
import TimerStateMsg from '@/features/timer/components/TimerStateMsg';
import {useSkipFirstEffect} from '@/shared/hooks';
import eventBus from '@/shared/lib/event-bus';
import {Notifications} from '@/shared/lib/notifications';
import {IMAGES, POMODORO_MSG} from '@/shared/utils/constants';
import {updateTitle} from '@/shared/utils/helpers';
import Clock from './components/Clock';
import {useTimer} from './hooks';
import sounds from './utils/sounds';

interface Props {
  mode: TimerMode;
  modes: ModesSettings;
  isAutoBreaks: boolean;
  isAutoFocus: boolean;
  onIncrementModeCounter: (mode: TimerMode) => void;
  onCompleteMode: (modeCompleted: TimerMode) => void;
  onJumpToMode: (mode: TimerMode) => void;
  onOpenSetting: () => void;
  onOpenSettingsYoutube: () => void;
}
const notifications = Notifications();

const Timer: FC<Props> = ({
  mode,
  modes,
  isAutoBreaks,
  isAutoFocus,
  onCompleteMode,
  onJumpToMode,
  onIncrementModeCounter,
  onOpenSetting,
  onOpenSettingsYoutube,
}) => {
  const {timerState, toggle, start, reset} = useTimer({
    mode: mode,
    minutes: modes[mode].time,
    onPause: () => eventBus.pauseTimer.emit(),
    onStart: () => eventBus.startTimer.emit(),
    onComplete: () => {
      const message = mode === 'focus' ? POMODORO_MSG.BREAK : POMODORO_MSG.FOCUS;
      notifications.showNotification(`${message}!`, {icon: IMAGES.NOTIFICATION});

      if (mode === 'focus') sounds.playBreak();
      else sounds.playFocus();

      completeMode();
    },
  });

  const withIncrementCount = (action: () => void) => {
    if (timerState.progress > 50) onIncrementModeCounter(mode);
    action();
  };

  const toggleTimer = () => {
    sounds.playBtnClick();
    toggle();
  };

  const completeMode = () => withIncrementCount(() => onCompleteMode(mode));
  const setMode = (newMode: TimerMode) => withIncrementCount(() => onJumpToMode(newMode));

  useSkipFirstEffect(() => {
    if (mode === 'focus') {
      eventBus.focusEnd.emit();
      if (isAutoBreaks) start();
      return;
    }

    eventBus.focusStart.emit();
    if (isAutoFocus) start();
  }, [mode]);

  useEffect(() => {
    updateTitle(timerState.timeLeft, mode);
  }, [mode, timerState.timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <ProgressCounters
        jumpToMode={setMode}
        mode={mode}
        progress={timerState.progress}
        isDisabled={timerState.isTicking}
        completedFocus={modes.focus.completed}
        completedBreakShort={modes.short_break.completed}
        completedBreakLong={modes.long_break.completed}
      />

      <TimerStateMsg mode={mode} />

      <Clock seconds={timerState.timeLeft} />

      <TimerActions
        isTicking={timerState.isTicking}
        toggleTimer={toggleTimer}
        openSettings={onOpenSetting}
        openSettingsYoutube={onOpenSettingsYoutube}
        nextTimerMode={completeMode}
        resetTimerMode={reset}
      />
    </div>
  );
};

export default Timer;
