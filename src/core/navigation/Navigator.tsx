import {useEffect} from 'react';
import {useSettings} from '@/hooks/useSettings';
import PageContainer from '@/components/PageContainer';
import {ModeSelector} from '@/features/mode-selector';

const Navigator = () => {
  const {state, dispatch} = useSettings();

  const setMode = (mode: TimerMode) => dispatch('setMode', {mode});

  useEffect(() => {
    // TODO: GET FROM LS

    // TODO: SET TO LS

    document.documentElement.dataset.theme = state.mode;
    document.documentElement.dataset.mode = state.isDarkTheme ? 'dark' : 'light';
  }, [state.mode, state.isDarkTheme]);

  return (
    <PageContainer>
      <div className="grid grid-cols-3 gap-5">
        <div className=""></div>
        <div className="flex flex-col items-center ">
          <ModeSelector mode={state.mode} setMode={setMode} classes="my-16" />
        </div>
        <div className=""></div>
      </div>
    </PageContainer>
  );
};

export default Navigator;
