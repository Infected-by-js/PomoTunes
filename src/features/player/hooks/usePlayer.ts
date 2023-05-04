import {useEffect, useMemo, useState} from 'react';
import {YouTubeEvent, YouTubePlayer} from 'react-youtube';
import eventBus from '@/shared/lib/event-bus';
import {fadeVolume} from '../utils/fadeVolume';

export const usePlayer = () => {
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onPlayerReady = (event: YouTubeEvent) => {
    setIsReady(true);
    setPlayer(event.target);
  };

  const title = useMemo(() => {
    return player?.videoTitle ?? 'Waiting for a YouTube video title...';
  }, [player]);

  const play = () => player.playVideo();
  const pause = () => player.pauseVideo();

  useEffect(() => {
    const playCleanUp = eventBus.startTimer.subscribe(play);
    const pauseCleanUp = eventBus.pauseTimer.subscribe(pause);

    const focusStartCleanUp = eventBus.focusStart.subscribe(() => {
      play();
      fadeVolume(player, 100);
    });
    const focusEndCleanUp = eventBus.focusEnd.subscribe(() => {
      fadeVolume(player, 5);
    });

    return () => {
      playCleanUp();
      pauseCleanUp();
      focusStartCleanUp();
      focusEndCleanUp();
    };
  }, [player]);

  return {
    isReady,
    title,
    onPlayerReady,
  };
};
