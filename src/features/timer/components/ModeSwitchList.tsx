import {FC} from 'react';
import clsx from 'clsx';
import {Keymap} from '@/shared/components';
import {capitalize} from '@/shared/utils/string-utils';
import {modeItems} from '../utils/constants';
import {ModeItem} from '../utils/types';

interface Props {
  mode: TimerMode;
  selectMode: (newMode: TimerMode) => void;
}

const modeToTitle = (mode: TimerMode) => capitalize(mode.replace('_', ' '));

const ItemButton =
  ({mode, selectMode}: Props) =>
  ({name, Icon, keys}: ModeItem) => {
    return (
      <button
        onClick={() => selectMode(name)}
        key={name}
        className={clsx(
          'text-dark  focus:bg-accent-300 outline-none dark:text-accent-100 hover:dark:text-accent-900 focus:dark:text-accent-900 text-sm flex items-center w-full h-10 hover:bg-accent-300 px-2 hover:cursor-pointer',
          mode === name ? 'font-semibold ' : ''
        )}
      >
        <Icon size={20} className="mr-2 flex-shrink-0" />
        <p className="flex flex-grow text-start  flex-nowrap">{modeToTitle(name)}</p>
        {keys?.length && <Keymap keys={keys} />}
      </button>
    );
  };

const ModeSwitchList: FC<Props> = ({mode, selectMode}) => {
  return (
    <div className="flex flex-col items-start overflow-hidden">
      {modeItems.map(ItemButton({mode, selectMode}))}
    </div>
  );
};

export default ModeSwitchList;
