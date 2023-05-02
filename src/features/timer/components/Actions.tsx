import {FC} from 'react';
import clsx from 'clsx';
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
      className: 'rounded-l-lg',
    },
    {
      _id: 1,
      Icon: TbPlayerSkipForwardFilled,
      action: nextTimerMode,
      className: '',
    },
    {
      _id: 2,
      Icon: TbReload,
      action: resetTimerMode,
      className: '',
    },
    {
      _id: 3,
      Icon: TbSettings,
      action: openSettings,
      className: 'rounded-r-lg',
    },
  ];

  return (
    <div className={'inline-flex items-center justify-center'}>
      {buttons.map(({_id, Icon, action, className}) => (
        <button
          key={_id}
          onClick={action}
          className={clsx(
            'flex items-center justify-center outline-none text-white bg-black/75 w-8 h-8 transition-all ease-in-out duration-150',
            className
          )}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default Actions;
