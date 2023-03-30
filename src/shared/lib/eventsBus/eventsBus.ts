import {AnyFunction} from './types';

const subscriptions = new Map<string, Set<AnyFunction>>();

const subscribe = (eventName: string, callback: AnyFunction) => {
  if (!subscriptions.has(eventName)) {
    subscriptions.set(eventName, new Set());
  }

  const callbacks = subscriptions.get(eventName) as Set<AnyFunction>;

  callbacks.add(callback);

  return () => {
    callbacks.delete(callback);

    if (!callbacks.size) subscriptions.delete(eventName);
  };
};

const emit = (eventName: string, ...args: any[]) => {
  if (!subscriptions.has(eventName)) return;

  const callbacks = subscriptions.get(eventName);

  callbacks?.forEach((callback) => {
    callback(...args);
  });
};

export default {
  subscribe,
  emit,
};
