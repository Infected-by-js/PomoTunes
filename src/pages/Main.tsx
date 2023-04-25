import {useEffect} from 'react';
import {useSettings} from '@/contexts/settings';
import Clock from '@/features/timer/components/Clock';
import {useTimer} from '@/features/timer/hooks/useTimer';
import {GitHubCorner, PageContainer} from '@/shared/components';
import {AudioPlayer} from '@/shared/lib/audio-player';
import eventBus from '@/shared/lib/event-bus';
import {Notifications} from '@/shared/lib/notifications';
import {IMAGES, POMODORO_MSG, SOUNDS} from '@/shared/utils/constants';
import {updateTitle} from '@/shared/utils/helpers';
import ProgressCounters from '@/components/ProgressCounters';
import TimerActions from '@/components/TimerActions';
import TimerStateMsg from '@/components/TimerStateMsg';

const buttonAudio = new AudioPlayer({src: SOUNDS.BUTTON_PRESS});
const breakAudio = new AudioPlayer({src: SOUNDS.SOUND_1});
const focusAudio = new AudioPlayer({src: SOUNDS.BELL});

const notifications = Notifications();

const MainPage = () => {
  const {state, dispatch} = useSettings();
  const {timerState, toggle, start, reset} = useTimer({
    mode: state.mode,
    minutes: state.modes[state.mode].time,
    onPause: () => eventBus.pauseTimer.emit(),
    onStart: () => eventBus.startTimer.emit(),
    onComplete: () => {
      const message = state.mode === 'focus' ? POMODORO_MSG.BREAK : POMODORO_MSG.FOCUS;
      notifications.showNotification(`${message}!`, {icon: IMAGES.NOTIFICATION});

      if (state.mode === 'focus') breakAudio.play();
      else focusAudio.play();

      completeMode();
    },
  });

  const withIncrementCount = (action: () => void) => {
    if (timerState.progress > 50) {
      dispatch('incrementModeCounter', {mode: state.mode});
      action();
    } else {
      action();
    }
  };

  const toggleTimer = () => {
    buttonAudio.play();
    toggle();
  };

  const completeMode = () => {
    withIncrementCount(() => dispatch('completeMode', {modeCompleted: state.mode}));
  };

  const setMode = (newMode: TimerMode) => {
    withIncrementCount(() => dispatch('setMode', {mode: newMode}));
  };

  useEffect(() => {
    if (state.mode === 'focus') {
      eventBus.focusEnd.emit();
      if (state.isAutoBreaks) start();
      return;
    }

    eventBus.focusStart.emit();
    if (state.isAutoFocus) start();
  }, [state.mode]);

  useEffect(() => {
    updateTitle(timerState.timeLeft, state.mode);
  }, [state.mode, timerState.timeLeft]);

  useEffect(() => {
    Notifications().requestPermission();
  }, []);

  return (
    <>
      <GitHubCorner />

      <PageContainer>
        <div className="flex items-center justify-center h-full">
          <div className="relative">
            <div
              className="absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-no-repeat bg-cover bg-center rounded-full w-40 h-40 flex items-center justify-center border-[3px]  border-dark bg-accent-300  text-dark"
              style={{backgroundImage: 'url(/player_placeholder.png)'}}
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              <ProgressCounters
                jumpToMode={setMode}
                mode={state.mode}
                progress={timerState.progress}
                isDisabled={timerState.isTicking}
                completedFocus={state.modes.focus.completed}
                completedBreakShort={state.modes.short_break.completed}
                completedBreakLong={state.modes.long_break.completed}
              />

              <TimerStateMsg mode={state.mode} />

              <Clock seconds={timerState.timeLeft} />

              <TimerActions
                isTicking={timerState.isTicking}
                toggleTimer={toggleTimer}
                openSettings={() => {}}
                openSettingsYoutube={() => {}}
                nextTimerMode={completeMode}
                resetTimerMode={reset}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
