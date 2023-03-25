import {FC} from 'react';
import clsx from 'clsx';

interface ProgressProps {
  progress: number;
  progressColorClass: string;
  placeholderColorClass: string;
  heightClass: string;
  wrapperClass?: string;
}

const ProgressLinear: FC<ProgressProps> = ({
  progress,
  placeholderColorClass,
  progressColorClass,
  heightClass,
  wrapperClass,
}) => {
  const CIRCUMFERENCE = 2 * Math.PI;
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;

  return (
    <div
      className={clsx(
        'relative w-full rounded-full',
        heightClass,
        `bg-${placeholderColorClass}`,
        wrapperClass
      )}
    >
      <svg
        className={clsx('absolute left-0 top-0 w-full ', heightClass)}
        viewBox="0 0 440 0"
        xmlns="http://www.w3.org/2000/svg"
        style={{transform: 'rotate(180deg)'}}
      >
        <path d="M 2 0 a 1 1 0 0 1 440 0" strokeWidth="2" strokeOpacity="0.3" fill="none" />
        <path
          d="M 2 0 a 1 1 0 0 1 440 0"
          strokeDasharray="440"
          strokeDashoffset={strokeDashoffset}
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-500 stroke-current"
          fill="none"
        />
      </svg>
      <div
        className={clsx(
          'absolute left-0 top-0 rounded-full',
          heightClass,
          `bg-${progressColorClass}`
        )}
        style={{
          width: `${progress}%`,
          transition: 'width 0.3s ease-in-out',
          opacity: progress > 0 ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ProgressLinear;
