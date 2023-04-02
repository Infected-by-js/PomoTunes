import {FC} from 'react';
import clsx from 'clsx';
import {ModeItem} from '@/shared/types';
import {capitalize} from '@/shared/utils';
import Keymap from '@/components/Keymap';
import {modeItems} from '../shared/constants';

interface Props {
  mode: TimerMode;
  selectMode: (newMode: TimerMode) => void;
}

const modeToTitle = (mode: TimerMode) => capitalize(mode.replace('_', ' '));

const ModeSwitchList: FC<Props> = ({mode, selectMode}) => {
  const ItemButton = ({name, Icon, keys}: ModeItem) => (
    <button
      onClick={() => selectMode(name)}
      key={name}
      className={clsx(
        'text-dark focus:bg-accent-300 outline-none dark:text-accent-100 text-md flex items-center w-full h-10 hover:bg-accent-300 px-2 hover:cursor-pointer',
        mode === name ? 'font-semibold ' : ''
      )}
    >
      <Icon size={20} className="mr-2" />
      <p className="flex flex-grow mr-4">{modeToTitle(name)}</p>
      {keys?.length && <Keymap keys={keys} />}
    </button>
  );

  return (
    <div className="flex flex-col items-start overflow-hidden">
      {modeItems.map(ItemButton)}
    </div>
  );
};

export default ModeSwitchList;
