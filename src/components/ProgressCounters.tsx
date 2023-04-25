import {FC} from 'react';
import {TbBrain, TbCoffee, TbPlant} from 'react-icons/tb';
import ProgressCountersBtn from '@/components/ProgressCountersBtn';

interface Props {
  isDisabled?: boolean;
  mode: TimerMode;
  progress: number;
  completedFocus: number;
  completedBreakShort: number;
  completedBreakLong: number;
  jumpToMode: (mode: TimerMode) => void;
}

const PomodoroCounters: FC<Props> = ({
  jumpToMode,
  mode,
  progress,
  isDisabled,
  completedFocus,
  completedBreakShort,
  completedBreakLong,
}) => {
  const checkIsActive = (currentMode: TimerMode) => {
    return mode === currentMode;
  };

  return (
    <div className="space-x-6 flex items-center justify-center">
      <ProgressCountersBtn
        onClick={() => jumpToMode('focus')}
        value={checkIsActive('focus') ? progress : 0}
        isActive={checkIsActive('focus')}
        isDisabled={isDisabled}
      >
        {completedFocus}
        <TbBrain size={24} className="ml-2" />
      </ProgressCountersBtn>

      <ProgressCountersBtn
        onClick={() => jumpToMode('short_break')}
        value={checkIsActive('short_break') ? progress : 0}
        isActive={checkIsActive('short_break')}
        isDisabled={isDisabled}
      >
        {completedBreakShort}
        <TbCoffee size={24} className="ml-2" />
      </ProgressCountersBtn>

      <ProgressCountersBtn
        onClick={() => jumpToMode('long_break')}
        value={checkIsActive('long_break') ? progress : 0}
        isActive={checkIsActive('long_break')}
        isDisabled={isDisabled}
      >
        {completedBreakLong}
        <TbPlant size={24} className="ml-2" />
      </ProgressCountersBtn>
    </div>
  );
};

export default PomodoroCounters;
