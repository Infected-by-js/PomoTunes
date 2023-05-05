import {useMemo, useState} from 'react';
import {YouTubeEvent, YouTubePlayer} from 'react-youtube';
import {fadeVolume} from '../utils/fadeVolume';

export const usePlayer = () => {
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onPlayerReady = (event: YouTubeEvent) => {
    setIsReady(true);
    setPlayer(event.target);
  };

  const onPlayerEnd = () => {
    player.seekTo(0);
    player.playVideo();
  };

  const title = useMemo(() => {
    return player?.videoTitle ?? 'Waiting for a YouTube video title...';
  }, [player]);

  const play = () => player.playVideo();
  const pause = () => player.pauseVideo();
  const setVolume = (value: number) => fadeVolume(player, value);

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
