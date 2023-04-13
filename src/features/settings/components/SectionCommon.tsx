import {FC} from 'react';
import {Checkbox} from '@/shared/components';

interface Props {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  className?: HTMLDivElement['className'];
}

const SectionCommon: FC<Props> = (props) => {
  const {className, isDarkTheme, toggleDarkTheme} = props;

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <p className="text-md">Dark mode</p>
        <Checkbox value={isDarkTheme} onChange={() => toggleDarkTheme()} isDisabled={false} />
      </div>
    </div>
  );
};

export default SectionCommon;
