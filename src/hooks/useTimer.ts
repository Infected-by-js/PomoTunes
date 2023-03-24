import {useCallback, useEffect, useRef, useState} from 'react';

interface Props {
  minutes: number;
  onStart?: () => void;
  onStop?: () => void;
  onComplete?: () => void;
}

const useTimer = ({minutes, onStart, onStop, onComplete}: Props) => {
  const time = minutes * 60;

  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTime] = useState(time);
  const [ticking, setTicking] = useState(false);

  const clear = () => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = () => {
    if (timeLeft > 0) {
      setTime(timeLeft - 1);
      setProgress((count) => count + 1);
    }

    if (timeLeft <= 1) {
      setTicking(false);
      clear();
      onComplete?.();
    }
  };

  useEffect(() => {
    if (ticking) {
      timerId.current = setInterval(tick, 1000);
    } else {
      clear();
    }

    return clear;
  }, [tick, ticking]);

  useEffect(() => setTime(time), [time]);

  const start = useCallback(() => {
    setTicking(true);
    onStart?.();
  }, [onStart]);

  const stop = useCallback(() => {
    setTicking(false);
    onStop?.();
  }, [onStop]);

  const reset = useCallback(() => {
    setTicking(false);
    setProgress(0);
    onStop?.();
  }, [onStop]);

  return {
    start,
    stop,
    reset,
    ticking,
    timeLeft,
    progress: (progress / time) * 100,
  };
};

export default useTimer;
