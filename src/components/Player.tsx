import {FC, useEffect, useState} from 'react';
import clsx from 'clsx';
import Youtube, {YouTubeEvent, YouTubePlayer} from 'react-youtube';
import eventsBus from '@/shared/lib/eventsBus';

interface Props {
  videoId: string;
  onReady: (isReady: boolean) => void;
}

const Player: FC<Props> = ({videoId, onReady}) => {
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onPlayerReady = (event: YouTubeEvent) => {
    setIsReady(true);
    setPlayer(event.target);
    onReady(true);
  };

  const play = () => player.playVideo();
  const pause = () => player.pauseVideo();
  const changeVolume = (percents: number) => player.setVolume(percents);

  useEffect(() => {
    const playCleanUp = eventsBus.startTimer.subscribe(play);
    const pauseCleanUp = eventsBus.pauseTimer.subscribe(pause);
    const focusStartCleanUp = eventsBus.focusStart.subscribe(() => changeVolume(100));
    const focusEndCleanUp = eventsBus.focusEnd.subscribe(() => changeVolume(30));

    return () => {
      playCleanUp();
      pauseCleanUp();
      focusStartCleanUp();
      focusEndCleanUp();
    };
  }, [player]);

  return (
    <>
      <div
        className={
          'w-[320px] h-[180px] relative shadow-xl flex justify-center items-center drop-shadow-lg rounded-3xl overflow-hidden'
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
