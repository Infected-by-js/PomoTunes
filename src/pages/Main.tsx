import bgVideo from '@/assets/videos/desk.mp4';
import { useSettings } from '@/contexts/settings';
import { Player } from '@/features/player';
import { Settings } from '@/features/settings';
import { Timer } from '@/features/timer';
import { ButtonIcon, PageContainer } from '@/shared/components';
import { useState } from 'react';
import {
  TbBorderCorners,
  TbBrain,
  TbBrandGithub,
  TbCoffee,
  TbPlant,
  TbPuzzle2,
} from 'react-icons/tb';

const MainPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {state, dispatch} = useSettings();

  const completeMode = (modeCompleted: TimerMode) => dispatch('completeMode', {modeCompleted});
  const incrementModeCounter = (mode: TimerMode) => dispatch('incrementModeCounter', {mode});
  const setTime = (mode: TimerMode, time: number) => dispatch('updateModeTime', {mode, time});
  const changeInterval = (interval: number) => dispatch('setLongBreakInterval', {interval});
  const toggleAutoBreaks = () => dispatch('toggleAutoBreaks');
  const toggleAutoFocus = () => dispatch('toggleAutoStarts');

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  return (
    <>
      <PageContainer bgLink={bgVideo} bgType="video">
        <div className="fixed w-screen top-6 z-10">
          <div className="grid grid-cols-3 mx-12">
            <div className="col-start-2 flex items-center justify-center space-x-4">
              <div className="flex items-center justify-center outline-none  px-3 py-px text-lg  bg-black/75 text-white  rounded-lg">
                {state.modes.focus.completed} <TbBrain className="ml-2" size={22} />
              </div>
              <div className="flex items-center justify-center outline-none  px-3 py-px text-lg  bg-black/75 text-white  rounded-lg">
                {state.modes.short_break.completed} <TbCoffee className="ml-2" size={22} />
              </div>
              <div className="flex items-center justify-center outline-none  px-3 py-px text-lg  bg-black/75 text-white  rounded-lg ">
                {state.modes.long_break.completed} <TbPlant className="ml-2" size={22} />
              </div>
            </div>

            <div className="flex justify-end items-center">
              <ButtonIcon onClick={() => {}} icon={TbPuzzle2} className="ml-4" />
              <ButtonIcon onClick={() => {}} icon={TbBrandGithub} className="ml-4" />
              <ButtonIcon onClick={() => {}} icon={TbBorderCorners} className="ml-4" />
            </div>
          </div>
        </div>

        <div className="fixed max-h-screen top-24 left-1/2 z-10 transform -translate-x-1/2">
          <Timer
            mode={state.mode}
            modes={state.modes}
            isAutoBreaks={state.isAutoBreaks}
            isAutoFocus={state.isAutoFocus}
            onCompleteMode={completeMode}
            onIncrementModeCounter={incrementModeCounter}
            openSettings={toggleSettings}
          />

          {isSettingsOpen && (
            <Settings
              modes={state.modes}
              longBreakInterval={state.longBreakInterval}
              isAutoBreaks={state.isAutoBreaks}
              isAutoFocus={state.isAutoFocus}
              onChangeTime={setTime}
              onChangeLongBreakInterval={changeInterval}
              onToggleAutoFocus={toggleAutoFocus}
              onToggleAutoBreaks={toggleAutoBreaks}
            />
          )}
        </div>

        <div className="fixed bottom-6 w-screen flex justify-center items-center">
          <Player  />
        </div>
      </PageContainer>
    </>
  );
};

export default MainPage;
