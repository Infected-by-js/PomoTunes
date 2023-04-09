import {useState} from 'react';
import {TbAdjustmentsHorizontal, TbUser} from 'react-icons/tb';
import {PageContainer} from '@/shared/components';
import {useSettings} from '@/contexts/settings';
import {Timer} from '@/features/timer';
import {Player} from '@/features/youtube-player';

const MainPage = () => {
  const {state, dispatch} = useSettings();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const isLongBreak = !(state.round % state.longBreakInterval);

  const onPlayerReady = () => setIsPlayerReady(true);
  const onSetMode = (mode: TimerMode) => dispatch('setMode', {mode});
  const onIncrementRound = () => dispatch('incrementRound');

  return (
    <>
      {!isPlayerReady && (
        <div className="fixed inset-0 bg-accent-100  flex justify-center items-center z-50">
          <div
            className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-accent-500 rounded-full"
            role="status"
            aria-label="loading"
          />
        </div>
      )}

      <PageContainer>
        <div className="flex items-center justify-center h-full">
          <div className="">
            <div className="mb-6">
              <Player videoId={state.videoId} onReady={onPlayerReady} />
            </div>

            <Timer
              minutes={state.modes[state.mode].time}
              mode={state.mode}
              isLongBreak={isLongBreak}
              isAutoBreaks={state.isAutoBreaks}
              isAutoFocus={state.isAutoFocus}
              onSetMode={onSetMode}
              onIncrementRound={onIncrementRound}
            />

            <div className="flex justify-center items-center space-x-4 mt-6">
              <div className="rounded-full font-semibold leading-none w-8 h-8 flex items-center justify-center bg-accent-300  text-dark dark:text-light border-2 border-dark text-accent-500 dark:border-light">
                {state.round}
              </div>

              <button className="rounded-full w-8 h-8 flex items-center justify-center border-2  border-dark bg-accent-300 text-dark focus:border-accent-700 focus:text-accent-700 hover:text-accent-700 outline-none  hover:border-accent-700  border-accent-500 text-accent-500 dark:border-light transition-colors ease-in duration-100">
                <TbUser size={20} />
              </button>

              <button className="rounded-full w-8 h-8 flex items-center justify-center border-2  border-dark bg-accent-300 text-dark focus:border-accent-700 focus:text-accent-700 hover:text-accent-700 outline-none  hover:border-accent-700  border-accent-500 text-accent-500 dark:border-light transition-colors ease-in duration-100">
                <TbAdjustmentsHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
