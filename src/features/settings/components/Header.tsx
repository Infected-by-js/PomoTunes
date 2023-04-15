import {FC} from 'react';
import {TbX} from 'react-icons/tb';

interface Props {
  close: () => void;
}

const Header: FC<Props> = ({close}) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold text-lg">Settings</p>
      <button
        onClick={close}
        className="rounded-full w-8 h-8 flex items-center justify-center  text-dark hover:text-accent-700 outline-none transition-colors ease-in duration-100"
      >
        <TbX size={20} />
      </button>
    </div>
  );
};

export default Header;
