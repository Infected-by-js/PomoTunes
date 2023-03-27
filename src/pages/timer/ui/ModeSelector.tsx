import {FC, useRef} from 'react';
import Popup from 'reactjs-popup';
import {PopupActions} from 'reactjs-popup/dist/types';
import {MODE_ICON} from '../model/constants';
import ModeSelectorBtn from './ModeSelectorBtn';
import ModeSelectorList from './ModeSelectorList';
import {ModeSettings} from '@/contexts/settings';

interface Props {
  mode: ModeSettings;
  setMode: (mode: TimerMode) => void;
}

const ModeSelector: FC<Props> = ({mode, setMode}) => {
  const ref = useRef<PopupActions | null>(null);

  const selectMode = (newMode: TimerMode) => {
    if (newMode !== mode.id) {
      setMode(newMode);
    }

    ref.current?.close();
  };

  return (
    <div className="flex justify-center">
      <Popup
        ref={ref}
        closeOnDocumentClick
        trigger={<ModeSelectorBtn mode={mode.label} Icon={MODE_ICON[mode.id]} />}
        closeOnEscape={true}
        position="right top"
        arrow={false}
        offsetX={20}
      >
        <div className="bg-accent-100 dark:bg-accent-900 drop-shadow-lg rounded-lg overflow-hidden">
          <ModeSelectorList selectMode={selectMode} />
        </div>
      </Popup>
    </div>
  );
};

export default ModeSelector;
