import {useEffect, useState} from 'react';
import clsx from 'clsx';
import {
  TbAdjustmentsHorizontal,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerTrackNextFilled,
  TbUser,
} from 'react-icons/tb';
import {useSettings} from '@/hooks/useSettings';
import {useTimer} from '@/hooks/useTimer';
import {ConfirmMessage} from '@/shared/enums';
import {updateTitle} from '@/shared/helpers';
import eventsBus from '@/shared/lib/eventsBus';
import ButtonTimer from '@/components/ButtonTimer';
import Clock from '@/components/Clock';
import ModeSwitch from '@/components/ModeSwitch';
import PageContainer from '@/components/PageContainer';
import Player from '@/components/Player';
import ProgressLinear from '@/components/ProgressLinear';

const MainPage = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const {state, dispatch} = useSettings();
  const {progress, start, pause, reset, timeLeft, isTicking, withConfirm} = useTimer({
    minutes: state.modes[state.mode].time,
    onPause: () => {
      eventsBus.pauseTimer.emit();
    },
    onStart: () => {
      eventsBus.startTimer.emit();
    },
    onComplete: () => nextMode(),
  });

  const setMode = (mode: TimerMode) => {
    if (mode === 'focus') eventsBus.focusStart.emit();
    else eventsBus.focusEnd.emit();

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
  const confirmSetMode = (mode: TimerMode) => {
    withConfirm({msg: ConfirmMessage.Jump, action: () => setMode(mode)});
  };

  useEffect(() => {
    updateTitle(timeLeft, state.mode);
  }, [state.mode, timeLeft]);

  const onPlayerReady = (isReady: boolean) => setIsPlayerReady(isReady);

  return (
    <>
      {!isPlayerReady && (
        <div className="fixed inset-0 bg-accent-100  flex justify-center items-center z-50">
          Loading...
        </div>
      )}

      <div className="fixed top-0 left-0 right-0">
        <ProgressLinear
          progress={progress}
          placeholderColorClass="accent-300"
          progressColorClass="accent-500"
        />
      </div>

      <PageContainer>
        <div className="flex items-center justify-center h-full">
          <div className="">
            {/* PLAYER */}
            <div className="">
              <Player videoId={state.videoId} onReady={onPlayerReady} />
            </div>

            <div className="my-4 flex flex-col items-center justify-center">
              <Clock seconds={timeLeft} />

              <div className="mt-4  grid grid-cols-3  gap-3 grid-rows-2 content-center justify-items-center">
                <ButtonTimer
                  onClick={isTicking ? pause : start}
                  className={clsx(
                    'w-[144px] h-[144px] bg-accent-500 rounded-[32px] row-span-2 col-span-2',
                    isTicking ? 'border-4 border-dark' : ''
                  )}
                >
                  {isTicking ? (
                    <TbPlayerPauseFilled size={32} />
                  ) : (
                    <TbPlayerPlayFilled size={32} />
                  )}
                </ButtonTimer>

                <ModeSwitch mode={state.mode} setMode={confirmSetMode} />

                <ButtonTimer onClick={confirmNext} className="col-start-3">
                  <TbPlayerTrackNextFilled size={20} />
                </ButtonTimer>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mt-6">
              <div className="rounded-full font-semibold leading-none w-10 h-10 flex items-center justify-center border-4 border-accent-500 text-accent-500 dark:border-light">
                {state.round}
              </div>

              <button className="rounded-full w-10 h-10 flex items-center justify-center border-4 focus:border-accent-700 focus:text-accent-700 hover:text-accent-700 outline-none  hover:border-accent-700  border-accent-500 text-accent-500 dark:border-light transition-colors ease-in duration-100">
                <TbAdjustmentsHorizontal size={20} />
              </button>

              <button className="rounded-full w-10 h-10 flex items-center justify-center border-4 focus:border-accent-700 focus:text-accent-700 hover:text-accent-700 outline-none  hover:border-accent-700  border-accent-500 text-accent-500 dark:border-light transition-colors ease-in duration-100">
                <TbUser size={30} />
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
