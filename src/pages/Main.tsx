import {useEffect} from 'react';
import {useSettings} from '@/contexts/settings';
import {Timer} from '@/features/timer';
import {GitHubCorner, PageContainer} from '@/shared/components';
import {Notifications} from '@/shared/lib/notifications';

const MainPage = () => {
  const {state, dispatch} = useSettings();

  useEffect(() => {
    Notifications().requestPermission();
  }, []);

  const incrementModeCounter = (mode: TimerMode) => dispatch('incrementModeCounter', {mode});
  const completeMode = (modeCompleted: TimerMode) => dispatch('completeMode', {modeCompleted});
  const jumpToMode = (mode: TimerMode) => dispatch('setMode', {mode});
  const openSettings = () => {};
  const openSettingsYoutube = () => {};

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

            <Timer
              mode={state.mode}
              modes={state.modes}
              isAutoBreaks={state.isAutoBreaks}
              isAutoFocus={state.isAutoFocus}
              onIncrementModeCounter={incrementModeCounter}
              onCompleteMode={completeMode}
              onJumpToMode={jumpToMode}
              onOpenSetting={openSettings}
              onOpenSettingsYoutube={openSettingsYoutube}
            />
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
