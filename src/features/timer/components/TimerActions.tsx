import {FC} from 'react';
import clsx from 'clsx';
import {
  TbAdjustmentsHorizontal,
  TbBrandYoutube,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipForwardFilled,
  TbReload,
} from 'react-icons/tb';
import TimerActionsBtn from './TimerActionsBtn';

interface Props {
  isTicking: boolean;
  toggleTimer: () => void;
  openSettings: () => void;
  openSettingsYoutube: () => void;
  nextTimerMode: () => void;
  resetTimerMode: () => void;
}

const TimerActions: FC<Props> = ({
  isTicking,
  toggleTimer,
  openSettings,
  openSettingsYoutube,
  nextTimerMode,
  resetTimerMode,
}) => {
  return (
    <div className="flex items-center content-center space-x-2">
      <TimerActionsBtn
        onClick={openSettingsYoutube}
        isDisabled={isTicking}
        className={'w-10 h-10 bg-accent-100'}
      >
        <TbBrandYoutube size={20} />
      </TimerActionsBtn>
      <TimerActionsBtn
        onClick={openSettings}
        isDisabled={isTicking}
        className={'w-10 h-10 bg-accent-100'}
      >
        <TbAdjustmentsHorizontal size={20} />
      </TimerActionsBtn>

      <TimerActionsBtn
        onClick={toggleTimer}
        className={clsx(
          'w-16 h-16 bg-accent-500',
          isTicking ? 'border-4 border-dark dark:border-light' : ''
        )}
      >
        {isTicking ? <TbPlayerPauseFilled size={30} /> : <TbPlayerPlayFilled size={30} />}
      </TimerActionsBtn>

      <TimerActionsBtn
        onClick={nextTimerMode}
        isDisabled={isTicking}
        className={'w-10 h-10 bg-accent-100'}
      >
        <TbPlayerSkipForwardFilled size={20} />
      </TimerActionsBtn>
      <TimerActionsBtn
        onClick={resetTimerMode}
        isDisabled={isTicking}
        className={'w-10 h-10 bg-accent-100'}
      >
        <TbReload size={20} />
      </TimerActionsBtn>
    </div>
  );
};

export default TimerActions;
