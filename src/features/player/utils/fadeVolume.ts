import {YouTubePlayer} from 'react-youtube';

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const getContinueCondition = (isIncreasing: boolean, targetVolume: number) => {
  if (isIncreasing) return (vol: number) => vol < targetVolume;
  return (vol: number) => vol > targetVolume;
};

export const fadeVolume = (
  player: YouTubePlayer,
  target: number,
  duration: number = 500
): Promise<void> => {
  return new Promise((resolve) => {
    const clampedTargetVolume = clamp(target, 0, 100);
    const currentVolume = player.getVolume() as number;
    const isIncreasing = clampedTargetVolume > currentVolume;
    const fadeStep = isIncreasing ? 1 : -1;
    const durationStep = Math.round(duration / Math.abs(currentVolume - clampedTargetVolume));

    const meetsCondition = getContinueCondition(isIncreasing, clampedTargetVolume);

    let volume = currentVolume;
    let interval: ReturnType<typeof setInterval> | null = null;

    setInterval(() => {
      if (meetsCondition(volume)) {
        volume += fadeStep;
        player.setVolume(clamp(volume, 0, 100));
      } else {
        if (interval) clearInterval(interval);
        interval = null;
        resolve();
      }
    }, durationStep);
  });
};
