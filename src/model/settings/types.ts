export interface State {
  mode: TimerMode;
  isAutoBreaks: boolean;
  isAutoFocus: boolean;
  longBreakInterval: number;
  isDarkTheme: boolean;

  modes: {
    [key in TimerMode]: {
      id: TimerMode;
      label: string;
      time: number;
    };
  };
}

export type Action =
  | {type: 'setMode'; payload: {mode: TimerMode}}
  | {type: 'updateModeTime'; payload: {mode: TimerMode; time: number}}
  | {type: 'toggleAutoBreaks'; payload: null}
  | {type: 'toggleAutoStarts'; payload: null}
  | {type: 'toggleDarkTheme'; payload: null}
  | {type: 'setLongBreakInterval'; payload: {longBreakInterval: number}};

export type Dispatch = <T extends Action['type']>(
  type: T,
  payload?: Extract<Action, {type: T}>['payload'] & Extract<Action, {type: T}>['payload']
) => void;
