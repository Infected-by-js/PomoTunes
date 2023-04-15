import {FC} from 'react';
import {Checkbox, DividerHorizontal} from '@/shared/components';

interface Props {
  isAutoBreaks: boolean;
  isAutoFocus: boolean;
  toggleAutoFocus: () => void;
  toggleAutoBreaks: () => void;
  className?: HTMLDivElement['className'];
}

const SectionAuto: FC<Props> = (props) => {
  const {className, isAutoBreaks, isAutoFocus, toggleAutoBreaks, toggleAutoFocus} = props;

  return (
    <div className={className}>
      <DividerHorizontal label="Auto start" />

      <div className="mt-2 flex justify-between items-center">
        <p className="text-md">Auto Breaks</p>
        <Checkbox
          value={isAutoBreaks}
          onChange={() => toggleAutoBreaks()}
          isDisabled={false}
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-md">Auto Pomodoros</p>
        <Checkbox value={isAutoFocus} onChange={() => toggleAutoFocus()} isDisabled={false} />
      </div>
    </div>
  );
};

export default SectionAuto;
