export type EventName =
  | 'startTimer'
  | 'stopTimer'
  | 'pauseTimer'
  | 'completeTimerMode'
  | 'focusStart'
  | 'focusEnd';

export type EventFunction = (...args: any) => void;

export type CleanUpFunction = () => void;

export type EventHelperFunction = (eventName: EventName) => {
  subscribe: (callback: EventFunction) => CleanUpFunction;
  emit: (...args: Parameters<EventFunction>) => void;
};

export interface EventBus {
  subscribe(eventName: EventName, callback: EventFunction): CleanUpFunction;
  emit(eventName: EventName, ...args: Parameters<EventFunction>): void;
}

export type SubscriberEvents = Set<EventFunction>;
export type Subscriptions = Map<string, SubscriberEvents>;
