import {AnyFunction, CleanUpFunction, EventName} from './types';

class EventsBus {
  private subscriptions: Map<string, Set<AnyFunction>>;

  constructor() {
    this.subscriptions = new Map();
  }

  public subscribe(eventName: EventName, callback: AnyFunction): CleanUpFunction {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, new Set());
    }

    const callbacks = this.subscriptions.get(eventName) as Set<AnyFunction>;

    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);

      if (!callbacks.size) this.subscriptions.delete(eventName);
    };
  }

  public emit(eventName: EventName, ...args: any[]): void {
    if (!this.subscriptions.has(eventName)) return;

    const callbacks = this.subscriptions.get(eventName);

    callbacks?.forEach((callback) => callback(...args));
  }
}

export default new EventsBus();
