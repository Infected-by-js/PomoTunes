import {useCallback, useEffect, useRef, useState} from 'react';

interface Props {
  minutes: number;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onComplete?: () => void;
}
export const useTimer = ({minutes, onStart, onReset, onPause, onComplete}: Props) => {
  const time = minutes * 60;
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timeLeft, setTimeLeft] = useState(time);
  const [isTicking, setIsTicking] = useState(false);
  const [progress, setProgress] = useState(0);

  const clear = () => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft((prev) => prev - 1);
      setProgress((prev) => prev + 1);

      return;
    }

    setIsTicking(false);
    clear();

    onComplete?.();
  }, [onComplete, timeLeft]);

  const start = useCallback(() => {
    setIsTicking(true);
    onStart?.();
  }, [onStart, isTicking]);

  const pause = useCallback(() => {
    setIsTicking(false);
    onPause?.();
  }, [onPause, isTicking]);

  const reset = useCallback(
    (isInitialTime?: boolean) => {
      setIsTicking(false);
      setProgress(0);

      if (isInitialTime) setTimeLeft(time);

      onReset?.();
    },
    [onReset, progress, time]
  );

  const withConfirm = useCallback(
    ({msg = 'Are you sure?', action}: {msg?: string; action: () => void}) => {
      let allowed = true;

      if (isTicking) {
        pause();
        allowed = confirm(msg);
        start();
      }

      if (allowed) {
        reset();
        action();
      }
    },
    [start, pause, isTicking]
  );

  useEffect(() => {
    if (isTicking) timerId.current = setInterval(tick, 1000);
    else clear();

    return clear;
  }, [tick, isTicking]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  return {
    start,
    pause,
    reset,
    withConfirm,
    isTicking,
    timeLeft,
    progress: (progress / time) * 100,
  };
};
