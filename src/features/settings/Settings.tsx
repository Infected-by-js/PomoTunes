import {FC} from 'react';
import Popup from 'reactjs-popup';
import {useSettings} from '@/contexts/settings';
import {SectionAuto, SectionCommon, SectionTime, SectionYoutube} from './components';
import Header from './components/Header';

// FIXME: create custom modal with normal types!!!
const Settings: any = (close: () => void) => {
  const {state, dispatch} = useSettings();

  return (
    <div className="rounded-lg bg-accent-100 text-center shadow-xl min-w-[300px]">
      <div className="px-6 py-5">
        <Header close={close} />

        <SectionCommon
          isDarkTheme={state.isDarkTheme}
          toggleDarkTheme={() => dispatch('toggleDarkTheme')}
          className="mt-6"
        />

        <SectionYoutube
          videoId={state.videoId}
          changeVideoId={(id) => dispatch('changeVideoId', {id})}
          className="mt-6"
        />

        <SectionTime
          modes={state.modes}
          longBreakInterval={state.longBreakInterval}
          changeModeTime={(mode, time) => dispatch('updateModeTime', {mode, time})}
          changeLongBreakInterval={(interval) => dispatch('setLongBreakInterval', {interval})}
          className="mt-6"
        />

        <SectionAuto
          isAutoBreaks={state.isAutoBreaks}
          isAutoFocus={state.isAutoFocus}
          toggleAutoBreaks={() => dispatch('toggleAutoBreaks')}
          toggleAutoFocus={() => dispatch('toggleAutoStarts')}
          className="mt-6"
        />
      </div>
    </div>
  );
};

interface Props {
  trigger?: JSX.Element;
}

const contentStyle = {background: '#000', borderRadius: '10px'};
const overlayStyle = {background: 'rgba(0,0,0,0.4)'};

const SettingsPopup: FC<Props> = ({trigger}) => {
  return (
    <Popup trigger={trigger} {...{contentStyle, overlayStyle}} modal>
      {Settings}
    </Popup>
  );
};

export default SettingsPopup;
