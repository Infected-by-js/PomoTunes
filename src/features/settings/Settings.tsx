import {FC} from 'react';
import {TbX} from 'react-icons/tb';
import Popup from 'reactjs-popup';
import {useSettings} from '@/contexts/settings';
import {SectionAuto, SectionCommon, SectionTime, SectionYoutube} from './components';

// FIXME: create custom modal with normal types!!!
const Settings: any = (close: () => void) => {
  const {state, dispatch} = useSettings();

  return (
    <div className="rounded-lg bg-accent-100 text-center shadow-xl min-w-[300px]">
      <div className="px-6 py-5">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Settings</p>
          <button
            onClick={close}
            className="rounded-full w-8 h-8 flex items-center justify-center  text-dark hover:text-accent-700 outline-none transition-colors ease-in duration-100"
          >
            <TbX size={20} />
          </button>
        </div>

        <SectionCommon
          isDarkTheme={state.isDarkTheme}
          toggleDarkTheme={() => dispatch('toggleDarkTheme')}
          className="mt-6"
        />

        <SectionYoutube
          videoId={state.videoId}
          changeVideoId={(id) => console.log('change video id ', id)}
          className="mt-6"
        />

        <SectionTime
          modes={state.modes}
          longBreakInterval={state.longBreakInterval}
          changeModeTime={(mode, value) => console.log(`update ${mode}`, value)}
          changeLongBreakInterval={(value) => console.log('update long interval', value)}
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
