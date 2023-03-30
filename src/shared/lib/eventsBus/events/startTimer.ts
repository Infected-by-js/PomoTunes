import eventsBus from '../eventsBus';
import {AnyFunction} from '../types';

const eventName = 'startTimer';

const subscribe = (callback: AnyFunction) => {
  return eventsBus.subscribe(eventName, callback);
};

const emit = (data?: any) => {
  eventsBus.emit(eventName, data);
};

export default {
  subscribe,
  emit,
};
