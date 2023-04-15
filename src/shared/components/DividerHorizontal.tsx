import {FC} from 'react';
import clsx from 'clsx';

interface Props {
  label?: string;
  lineColor?: string;
  colorLabel?: string;
  bgLabel?: string;
  className?: HTMLDivElement['className'];
}

const DividerHorizontal: FC<Props> = ({label, lineColor, colorLabel, bgLabel, className}) => {
  return label ? (
    <div className={clsx('inline-flex items-center justify-center w-full', className)}>
      <hr className={clsx('w-full h-px my-4 border-0', `bg-${lineColor || 'accent-300'}`)} />
      <span
        className={clsx(
          'absolute px-3 font-light text-sm -translate-x-1/2 left-1/2',
          `text-${colorLabel || 'dark'}`,
          `bg-${bgLabel || 'accent-100'}`
        )}
      >
        {label}
      </span>
    </div>
  ) : (
    <hr className={clsx('w-full h-px my-4 border-0', `bg-${lineColor || 'accent-300'}`)} />
  );
};

export default DividerHorizontal;
