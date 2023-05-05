import {useCallback, useEffect, useState} from 'react';
import useInterval from './useInterval';

interface Props {
  mode: TimerMode;
  minutes: number;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onComplete?: () => void;
}

interface UseTimer {
  timerState: {
    isTicking: boolean;
    progress: number;
    timeLeft: number;
  };

  start: () => void;
  pause: () => void;
  reset: () => void;
  toggle: () => void;
}

const useTimer = (props: Props): UseTimer => {
  const {minutes, mode, onStart, onReset, onPause, onComplete} = props;
  const baseTime = minutes * 60;

  const [timeLeft, setTimeLeft] = useState(baseTime);
  const [isTicking, setIsTicking] = useState(false);

  useInterval(() => {
    if (timeLeft > 1) {
      setTimeLeft(timeLeft - 1);
      return;
    }

    setIsTicking(false);
    onComplete?.();
  }, isTicking);

  const start = useCallback(() => {
    setIsTicking(true);
    onStart?.();
  }, [onStart, isTicking]);

  const pause = useCallback(() => {
    setIsTicking(false);
    onPause?.();
  }, [onPause, isTicking]);

  const toggle = useCallback(() => {
    if (isTicking) pause();
    else start();
  }, [isTicking]);

  const reset = useCallback(() => {
    setTimeLeft(baseTime);
    onReset?.();
  }, [onReset, baseTime]);

  useEffect(() => {
    setTimeLeft(baseTime);
  }, [baseTime, mode]);

  return {
    timerState: {
      timeLeft,
      isTicking,
      progress: (1 - timeLeft / baseTime) * 100,
    },

    start,
    pause,
    toggle,
    reset,
  };
};

export default useTimer;
