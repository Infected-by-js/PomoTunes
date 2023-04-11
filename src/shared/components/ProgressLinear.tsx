import {FC} from 'react';
import clsx from 'clsx';

interface ProgressProps {
  progress: number;
  progressColorClass: string;
  placeholderColorClass: string;
}

const ProgressLinear: FC<ProgressProps> = ({
  progress,
  placeholderColorClass,
  progressColorClass,
}) => {
  return (
    <div className={clsx('relative w-full  h-2', `bg-${placeholderColorClass}`)}>
      <div
        className={clsx(
          'absolute left-0 top-0 h-2 rounded-r-full  transition-all duration-400 ease-in',
          `bg-${progressColorClass}`
        )}
        style={{width: `${progress}%`}}
      />
    </div>
  );
};

export default ProgressLinear;
