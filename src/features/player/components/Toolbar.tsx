import {FC} from 'react';
import {TbChevronDown, TbChevronUp, TbSearch} from 'react-icons/tb';
import {MarqueeText} from '@/shared/components';

interface Props {
  isPlayerPaused: boolean;
  isPlayerOpened: boolean;
  title: string;
  onToggleOpenPlayer: () => void;
  onOpenSearchForm: () => void;
}

const Toolbar: FC<Props> = ({
  isPlayerPaused,
  isPlayerOpened,
  title,
  onOpenSearchForm,
  onToggleOpenPlayer,
}) => {
  return (
    <div className="flex items-center w-full space-x-3">
      <button onClick={onToggleOpenPlayer} className="outline-none">
        {isPlayerOpened ? <TbChevronDown size={20} /> : <TbChevronUp size={20} />}
      </button>

      <MarqueeText text={title} isPause={isPlayerPaused} />

      <button onClick={onOpenSearchForm} className="outline-none">
        <TbSearch size={20} />
      </button>
    </div>
  );
};

export default Toolbar;
