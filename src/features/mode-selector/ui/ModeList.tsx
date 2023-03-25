import {FC, HTMLProps} from 'react';
import {IconType} from 'react-icons';
import Keymap from '@/components/Keymap';
import {modeItems} from '../model/constants';
import modeToTitle from '../utils/modeToTitle';

interface PropsItem extends HTMLProps<HTMLDivElement> {
  name: TimerMode;
  Icon: IconType;
  keys?: string[];
}

interface PropsList {
  selectMode: (newMode: TimerMode) => void;
}

const ModeItem: FC<PropsItem> = ({name, Icon, keys, ...props}) => {
  const title = modeToTitle(name);

  return (
    <div
      className="text-dark dark:text-accent-100 font-semibold text-lg flex items-center w-full h-12 hover:bg-accent-300 px-2 hover:cursor-pointer"
      {...props}
    >
      <Icon size={24} className="mr-2" />
      <p className="flex flex-grow mr-4">{title}</p>
      {keys?.length && <Keymap keys={keys} />}
    </div>
  );
};

const ModeList: FC<PropsList> = ({selectMode}) => {
  return (
    <div className="flex flex-col items-start">
      {modeItems.map(({name, Icon, keys}) => (
        <ModeItem
          name={name}
          Icon={Icon}
          keys={keys}
          onClick={() => selectMode(name)}
          key={name}
        />
      ))}
    </div>
  );
};

export default ModeList;
