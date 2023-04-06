import * as T from './types';

class EventBus implements T.EventBus {
  private subscriptions: T.Subscriptions;

  constructor() {
    this.subscriptions = new Map();
  }

  public subscribe(eventName: T.EventName, callback: T.EventFunction): T.CleanUpFunction {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, new Set());
    }

    const callbacks = this.subscriptions.get(eventName) as T.SubscriberEvents;

    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);

      if (!callbacks.size) this.subscriptions.delete(eventName);
    };
  }

  public emit(eventName: T.EventName, ...args: Parameters<T.EventFunction>): void {
    if (!this.subscriptions.has(eventName)) return;

    const callbacks = this.subscriptions.get(eventName);

    callbacks?.forEach((callback) => callback(...args));
  }
}

export default new EventBus();
