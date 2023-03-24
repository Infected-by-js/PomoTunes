import {FC} from 'react';
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbPlayerTrackNextFilled,
} from 'react-icons/tb';
import ActionsButton from './ActionsButton';

interface Props {
  timerState: TimerState;
  togglePauseTimer: (currentState: TimerState) => void;
  stopTimer: () => void;
  toNextMode: () => void;
}

const Actions: FC<Props> = ({timerState, togglePauseTimer, stopTimer, toNextMode}) => {
  return (
    <div className="grid grid-cols-3 gap-4 grid-rows-2 ">
      <ActionsButton
        onClick={() => togglePauseTimer(timerState)}
        classes={'text-5xl w-44 h-44 bg-accent-500 rounded-[32px]  row-span-2  col-span-2'}
        active={timerState === 'play'}
      >
        {timerState === 'play' ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
      </ActionsButton>

      <ActionsButton
        onClick={stopTimer}
        classes="text-3xl w-20 h-20 bg-accent-300 rounded-2xl col-start-3"
      >
        <TbPlayerStopFilled />
      </ActionsButton>

      <ActionsButton
        onClick={toNextMode}
        classes="text-3xl w-20 h-20 bg-accent-300 rounded-2xl col-start-3"
      >
        <TbPlayerTrackNextFilled />
      </ActionsButton>
    </div>
  );
};

export default Actions;
