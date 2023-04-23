import {useEffect} from 'react';
import {TbBrain, TbCoffee, TbPlant} from 'react-icons/tb';
import {useSettings} from '@/contexts/settings';
import {Timer} from '@/features/timer';
import {Button, GitHubCorner, PageContainer} from '@/shared/components';
import {Notifications} from '@/shared/lib/notifications';

// TODO: remove flickering page before styles loaded
const MainPage = () => {
  const {state, dispatch} = useSettings();

  const onSetMode = (mode: TimerMode) => dispatch('setMode', {mode});
  const onIncrementRound = () => dispatch('incrementRound');
  const isLongBreak = !(state.modes.focus.completed % state.longBreakInterval);

  useEffect(() => {
    Notifications().requestPermission();
  }, []);

  return (
    <>
      {/* {!isPlayerReady && (
        <div className="fixed inset-0 bg-accent-100  flex justify-center items-center z-50">
          <div
            className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-accent-500 rounded-full"
            role="status"
            aria-label="loading"
          />
        </div>
      )} */}

      <GitHubCorner />

      <PageContainer>
        <div className="flex items-center justify-center h-full">
          <div className="">
            {/* <div className="mx-auto mb-8 rounded-full w-40 h-40 flex items-center justify-center border-[3px]  border-dark bg-accent-300 text-dark"></div> */}

            <div className="mb-6 space-x-6 flex items-center justify-center">
              <Button className={'w-24 h-9 bg-accent-300 text-2xl'}>
                0
                <TbBrain size={24} className="ml-3" />
              </Button>
              <Button className={'w-24 h-9 bg-accent-100 text-2xl'}>
                0
                <TbCoffee size={24} className="ml-3" />
              </Button>
              <Button className={'w-24 h-9 bg-accent-100 text-2xl'}>
                0
                <TbPlant size={24} className="ml-3" />
              </Button>
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
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
