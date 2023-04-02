export type EventName =
  | 'startTimer'
  | 'stopTimer'
  | 'pauseTimer'
  | 'completeTimerMode'
  | 'focusStart'
  | 'focusEnd';

export type AnyFunction = (...args: any) => any;
export type CleanUpFunction = () => void;
export type EventHelperFunction = (eventName: EventName) => {
  subscribe: (callback: AnyFunction) => CleanUpFunction;
  emit: (data?: any) => void;
};
