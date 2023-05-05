import {useEffect, useRef} from 'react';

const useInterval = (cb: Function = () => {}, isTicking: boolean) => {
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };

    if (isTicking) timerRef.current = setInterval(() => cb(), 1000);
    else clear();

    return clear;
  }, [cb, isTicking]);
};

export default useInterval;
