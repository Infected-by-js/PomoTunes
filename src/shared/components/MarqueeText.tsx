import {FC, HTMLProps} from 'react';
import clsx from 'clsx';

interface Props {
  text: string;
  isPause: boolean;
  className?: HTMLProps<HTMLDivElement>['className'];
}

const MarqueeText: FC<Props> = ({text, isPause, className}) => {
  return (
    <div className={clsx('flex-1 relative flex overflow-x-hidden', className)}>
      {isPause ? (
        <div className="whitespace-nowrap truncate">
          <span className="mx-4">{text}</span>
        </div>
      ) : (
        <>
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4">{text}</span>
          </div>

          <div className="animate-marquee2 absolute top-0 whitespace-nowrap">
            <span className="mx-4">{text}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MarqueeText;
