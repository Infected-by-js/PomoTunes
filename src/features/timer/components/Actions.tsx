import {FC} from 'react';
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipForwardFilled,
  TbReload,
  TbSettings,
} from 'react-icons/tb';

interface Props {
  isTicking: boolean;
  toggleTimer: () => void;
  nextTimerMode: () => void;
  resetTimerMode: () => void;
  openSettings: () => void;
}

const Actions: FC<Props> = ({
  isTicking,
  toggleTimer,
  openSettings,
  nextTimerMode,
  resetTimerMode,
}) => {
  const buttons = [
    {
      _id: 0,
      Icon: isTicking ? TbPlayerPauseFilled : TbPlayerPlayFilled,
      action: toggleTimer,
    },
    {
      _id: 1,
      Icon: TbPlayerSkipForwardFilled,
      action: nextTimerMode,
    },
    {
      _id: 2,
      Icon: TbReload,
      action: resetTimerMode,
    },
    {
      _id: 3,
      Icon: TbSettings,
      action: openSettings,
    },
  ];

  return (
    <div className={'px-1 inline-flex items-center justify-center  bg-black/75 rounded-lg'}>
      {buttons.map(({_id, Icon, action}) => (
        <button
          key={_id}
          onClick={action}
          className="flex items-center  justify-center outline-none text-white w-8 h-8 transition-all ease-in-out duration-150"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default Actions;
