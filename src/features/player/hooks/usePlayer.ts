import {useEffect, useMemo, useState} from 'react';
import {YouTubeEvent, YouTubePlayer} from 'react-youtube';
import eventBus from '@/shared/lib/event-bus';
import {fadeVolume} from '../utils/fadeVolume';

export const usePlayer = () => {
  const [isPlayBeforeLoaded, setIsPlayBeforeLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const play = () => player?.playVideo();
  const pause = () => player?.pauseVideo();
  const setVolume = (value: number) => fadeVolume(player, value);

  const onPlayerReady = (event: YouTubeEvent) => {
    setIsReady(true);
    setPlayer(event.target);
  };

  const onPlayerEnd = () => {
    player.seekTo(0);
    play();
  };

  const title = useMemo(() => {
    return player?.videoTitle ?? 'Waiting for a YouTube video title...';
  }, [player]);

  useEffect(() => {
    if (isPlayBeforeLoaded) play();

    const playCleanUp = eventBus.startTimer.subscribe(() => {
      if (!player) setIsPlayBeforeLoaded(true);

      play();
    });

    const pauseCleanUp = eventBus.pauseTimer.subscribe(() => {
      if (!player) setIsPlayBeforeLoaded(false);

      pause();
    });

    const focusStartCleanUp = eventBus.focusStart.subscribe(() => {
      play();
      setVolume(100);
    });

    const focusEndCleanUp = eventBus.focusEnd.subscribe(async () => {
      await setVolume(10);
      pause();
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
    play,
    pause,
    setVolume,
    onPlayerReady,
    onPlayerEnd,
  };
};
