import {FC} from 'react';
import clsx from 'clsx';
import Youtube from 'react-youtube';
import {usePlayer} from './hooks/usePlayer';

interface Props {
  videoId: string;
  onReady: () => void;
}

const Player: FC<Props> = ({videoId, onReady}) => {
  const {isReady, onPlayerReady} = usePlayer(onReady);

  return (
    <>
      <div
        className={
          'w-[320px] h-[180px] relative shadow-xl flex justify-center items-center drop-shadow-lg rounded-2xl overflow-hidden'
        }
      >
        {!isReady && (
          <div className="animate-pulse  w-full h-full bg-accent-300 absolute top-0 left-0"></div>
        )}
        <Youtube
          videoId={videoId}
          onReady={onPlayerReady}
          className={clsx('w-full h-full', isReady ? 'block' : 'none')}
          iframeClassName="w-full h-full"
          opts={{
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
      </div>
    </>
  );
};

export default Player;
