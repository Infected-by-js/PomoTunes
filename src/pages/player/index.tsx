import {FC, useEffect, useState} from 'react';
import clsx from 'clsx';
import Youtube, {YouTubeEvent, YouTubePlayer} from 'react-youtube';
import eventsBus from '@/shared/lib/eventsBus';

interface Props {}
const videoId = '5yx6BWlEVcY';

const Player: FC<Props> = () => {
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onPlayerReady = (event: YouTubeEvent) => {
    setIsReady(true);
    setPlayer(event.target);

    console.log('Player is ready:', event.target);
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    console.log('Player state changed:', event);
  };

  // const unsubscribe = eventBus.startTimer.subscribe(callback);
  // unsubscribe()

  useEffect(() => {
    const play = () => player.playVideo();

    const subscribe = eventsBus.startTimer.subscribe(play);

    return () => subscribe();
  });

  const stop = () => {
    player.stopVideo();
  };

  const start = () => {
    player.playVideo();
  };

  const pause = () => {
    player.pauseVideo();
  };

  return (
    <>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={pause}>pause</button>

      <div className="w-[410px] h-[231px] relative shadow-2xl flex justify-center items-center drop-shadow-xl rounded-3xl overflow-hidden">
        {!isReady && (
          <div className="animate-pulse  w-full h-full bg-accent-300 absolute top-0 left-0"></div>
        )}

        <Youtube
          videoId={videoId}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
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
