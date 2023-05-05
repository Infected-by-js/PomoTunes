import {useCallback, useMemo, useState} from 'react';

type Value<T> = Exclude<T, AnyFunction>;
type AnyFunction = (...args: any[]) => any;
type SetFunction<T> = (newValue: T | ((prevValue: T) => T)) => void;
type ReturnValue<T> = [T, SetFunction<Exclude<T, AnyFunction>>, () => void];

const useUndoState = <T>(defaultValue: Value<T>, maxSize = 1) => {
  const [value, setValue] = useState<Value<T>[]>([defaultValue]);

  const set: SetFunction<Value<T>> = useCallback(
    (newValue) => {
      return setValue((current) => {
        const restValues = current.length >= maxSize ? current.slice(0, maxSize) : current;

        if (typeof newValue === 'function') {
          return [(newValue as Function)(current[0]), ...restValues];
        }

        return [newValue, ...restValues];
      });
    },
    [maxSize]
  );

  const undo = useCallback(() => {
    setValue((current) => {
      if (current.length === 1) return current;

      const [, ...values] = current;

      return values;
    });
  }, []);

  return useMemo<ReturnValue<T>>(() => [value[0], set, undo], [value, set, undo]);
};

export default useUndoState;
