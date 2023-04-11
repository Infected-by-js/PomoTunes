import {FC, useRef} from 'react';
import Popup from 'reactjs-popup';
import {PopupActions} from 'reactjs-popup/dist/types';
import {MODE_ICON} from '../utils/constants';
import Button from './Button';
import ModeSwitchList from './ModeSwitchList';

interface Props {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}

const ModeSwitch: FC<Props> = ({mode, setMode}) => {
  const ref = useRef<PopupActions | null>(null);
  const Icon = MODE_ICON[mode];

  const selectMode = (newMode: TimerMode) => {
    if (newMode !== mode) {
      setMode(newMode);
    }

    ref.current?.close();
  };

  return (
    <div className="flex justify-center col-start-3">
      <Popup
        ref={ref}
        closeOnDocumentClick
        trigger={
          <Button>
            <Icon size={24} />
          </Button>
        }
        closeOnEscape={true}
        position="right top"
        arrow={false}
        offsetX={20}
      >
        <div className="bg-accent-100 dark:bg-accent-900 drop-shadow-lg rounded-lg overflow-hidden">
          <ModeSwitchList selectMode={selectMode} mode={mode} />
        </div>
      </Popup>
    </div>
  );
};

export default ModeSwitch;
