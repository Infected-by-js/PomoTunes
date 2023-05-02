import {FC, useEffect} from 'react';
import {ModesSettings} from '@/contexts/settings';
import eventBus from '@/shared/lib/event-bus';
import {Notifications} from '@/shared/lib/notifications';
import {IMAGES, POMODORO_MSG} from '@/shared/utils/constants';
import {updateTitle} from '@/shared/utils/helpers';
import Actions from './components/Actions';
import Clock from './components/Clock';
import StateMsg from './components/StateMsg';
import {useTimer} from './hooks';
import sounds from './utils/sounds';

interface Props {
  mode: TimerMode;
  modes: ModesSettings;
  isAutoBreaks: boolean;
  isAutoFocus: boolean;
  onIncrementModeCounter: (mode: TimerMode) => void;
  onCompleteMode: (modeCompleted: TimerMode) => void;
  openSettings: () => void;
}
const notifications = Notifications();

const Timer: FC<Props> = ({
  mode,
  modes,
  isAutoBreaks,
  isAutoFocus,
  onCompleteMode,
  onIncrementModeCounter,
  openSettings,
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

  const toggleTimer = () => {
    sounds.playBtnClick();
    toggle();
  };

  const completeMode = () => {
    if (timerState.progress > 50) onIncrementModeCounter(mode);
    onCompleteMode(mode);

    if (mode === 'focus') {
      eventBus.focusEnd.emit();
      if (isAutoBreaks) start();
      return;
    }

    eventBus.focusStart.emit();
    if (isAutoFocus) start();
  };

  useEffect(() => {
    updateTitle(timerState.timeLeft, mode);
  }, [mode, timerState.timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <StateMsg value={timerState.progress} mode={mode} />
      <Clock seconds={timerState.timeLeft} />
      <Actions
        isTicking={timerState.isTicking}
        nextTimerMode={completeMode}
        resetTimerMode={reset}
        toggleTimer={toggleTimer}
        openSettings={openSettings}
      />
    </div>
  );
};

export default Timer;
