import eventsBus from './eventsBus';
import {AnyFunction, EventHelperFunction, EventName} from './types';

window.eb = eventsBus;

export const createEventHelper = (eventName: EventName): ReturnType<EventHelperFunction> => {
  const subscribe = (callback: AnyFunction) => eventsBus.subscribe(eventName, callback);
  const emit = (data?: any) => eventsBus.emit(eventName, data);

  return {subscribe, emit};
};
