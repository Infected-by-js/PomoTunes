import eventBus from './eventBus';
import {EventFunction, EventHelperFunction, EventName} from './types';

export const createEventHelper: EventHelperFunction = (eventName: EventName) => {
  const subscribe = (callback: EventFunction) => eventBus.subscribe(eventName, callback);
  const emit = (...args: Parameters<EventFunction>) => eventBus.emit(eventName, ...args);

  return {subscribe, emit};
};
