import {FC, HTMLProps, useRef} from 'react';
import cn from 'classnames';
import {Popup} from 'reactjs-popup';
import {PopupActions} from 'reactjs-popup/dist/types';
import ModeBtn from './ModeBtn';
import ModeList from './ModeList';

interface Props {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  classes?: HTMLProps<HTMLElement>['className'];
}

const Mode: FC<Props> = ({mode, setMode, classes}) => {
  const ref = useRef<PopupActions | null>(null);

  const selectMode = (newMode: TimerMode) => {
    if (newMode !== mode) {
      setMode(newMode);
    }

    ref.current?.close();
  };

  return (
    <div className={cn('flex justify-center', classes)}>
      <Popup
        ref={ref}
        closeOnDocumentClick
        trigger={<ModeBtn mode={mode} />}
        closeOnEscape={true}
        position="right top"
        arrow={false}
        offsetX={20}
      >
        <div className="bg-accent-100 dark:bg-accent-900 drop-shadow-lg rounded-lg overflow-hidden">
          <ModeList selectMode={selectMode} />
        </div>
      </Popup>
    </div>
  );
};

export default Mode;
