import {useEffect, useState} from 'react';
import {YouTubeEvent, YouTubePlayer} from 'react-youtube';
import eventBus from '@/shared/lib/event-bus';

export const usePlayer = () => {
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onPlayerReady = (event: YouTubeEvent) => {
    setIsReady(true);
    setPlayer(event.target);
  };

  const play = () => player.playVideo();
  const pause = () => player.pauseVideo();
  const changeVolume = (percents: number) => player.setVolume(percents);

  useEffect(() => {
    const playCleanUp = eventBus.startTimer.subscribe(play);
    const pauseCleanUp = eventBus.pauseTimer.subscribe(pause);
    const focusStartCleanUp = eventBus.focusStart.subscribe(() => changeVolume(100));
    const focusEndCleanUp = eventBus.focusEnd.subscribe(() => changeVolume(30));

    return () => {
      playCleanUp();
      pauseCleanUp();
      focusStartCleanUp();
      focusEndCleanUp();
    };
  }, [player]);

  return {
    isReady,
    onPlayerReady,
  };
};
