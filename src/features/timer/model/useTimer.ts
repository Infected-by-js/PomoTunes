import {useCallback, useEffect, useRef, useState} from 'react';

interface Props {
  minutes: number;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onComplete?: () => void;
}

const useTimer = ({
  minutes,
  onStart = () => {},
  onPause = () => {},
  onStop = () => {},
  onComplete = () => {},
}: Props) => {
  const time = minutes * 60;
  const initialTime = useRef(time);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(time);
  const [isTicking, setIsTicking] = useState(false);

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
      setProgress((count) => count + 1);
      return;
    }

    setIsTicking(false);
    clear();
    onComplete();
  }, [timeLeft, onComplete]);

  const start = useCallback(() => {
    setIsTicking(true);
    onStart();
  }, [onStart]);

  const pause = useCallback(() => {
    setIsTicking(false);
    onPause();
  }, [onPause]);

  const stop = useCallback(() => {
    setIsTicking(false);
    setProgress(0);
    setTimeLeft(initialTime.current);
    onStop();
  }, [onPause]);

  const clear = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = null;
  }, []);

  useEffect(() => {
    initialTime.current = time;
  }, [time]);

  useEffect(() => {
    if (isTicking) timerId.current = setInterval(tick, 1000);
    else clear();

    return clear;
  }, [isTicking, tick]);

  return {
    start,
    pause,
    stop,
    isTicking,
    timeLeft,

    progress: (progress / initialTime.current) * 100,
  };
};

export default useTimer;
