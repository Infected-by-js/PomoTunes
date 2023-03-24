import {useEffect} from 'react';
import {useSettings} from '@/hooks/useSettings';
import PageContainer from '@/components/PageContainer';
import Timer from '@/components/Timer';

const Navigator = () => {
  const {state} = useSettings();

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
        <Timer />
        <div className=""></div>
      </div>
    </PageContainer>
  );
};

export default Navigator;
