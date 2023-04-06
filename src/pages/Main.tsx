import {useState} from 'react';
import {TbAdjustmentsHorizontal, TbUser} from 'react-icons/tb';
import {useSettings} from '@/hooks/useSettings';
import PageContainer from '@/components/PageContainer';
import Player from '@/components/Player';
import Timer from '@/components/Timer';

const MainPage = () => {
  const {state, dispatch} = useSettings();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const isLongBreak = !(state.round % state.longBreakInterval);

  const onPlayerReady = (isReady: boolean) => setIsPlayerReady(isReady);
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
            <div className="">
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
              <div className="rounded-full font-semibold leading-none w-10 h-10 flex items-center justify-center border-4 border-accent-500 text-accent-500 dark:border-light">
                {state.round}
              </div>

              <button className="rounded-full w-10 h-10 flex items-center justify-center border-4 focus:border-accent-700 focus:text-accent-700 hover:text-accent-700 outline-none  hover:border-accent-700  border-accent-500 text-accent-500 dark:border-light transition-colors ease-in duration-100">
                <TbUser size={20} />
              </button>

              <button className="rounded-full w-10 h-10 flex items-center justify-center border-4 focus:border-accent-700 focus:text-accent-700 hover:text-accent-700 outline-none  hover:border-accent-700  border-accent-500 text-accent-500 dark:border-light transition-colors ease-in duration-100">
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
