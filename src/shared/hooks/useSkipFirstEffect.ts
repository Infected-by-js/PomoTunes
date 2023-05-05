import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

const useSkipFirstEffect = (effect: EffectCallback, deps?: DependencyList | undefined) => {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const destructor = effect();

    return destructor;
  }, deps);
};

export default useSkipFirstEffect;
