export interface ModeSettings {
  id: TimerMode;
  label: string;
  time: number;
  color: string;
  completed: number;
}
export interface State {
  videoId: string;
  mode: TimerMode;
  isAutoBreaks: boolean;
  isAutoFocus: boolean;
  longBreakInterval: number;
  isDarkTheme: boolean;

  modes: {
    [key in TimerMode]: ModeSettings;
  };
}

export type Action =
  | {type: 'setMode'; payload: {mode: TimerMode}}
  | {type: 'updateModeTime'; payload: {mode: TimerMode; time: number}}
  | {type: 'setLongBreakInterval'; payload: {interval: number}}
  | {type: 'changeVideoId'; payload: {id: string}}
  | {type: 'incrementRound'; payload: {mode: TimerMode}}
  | {type: 'toggleAutoBreaks'; payload: null}
  | {type: 'toggleAutoStarts'; payload: null}
  | {type: 'toggleDarkTheme'; payload: null};

export type Dispatch = <T extends Action['type']>(
  type: T,
  payload?: Extract<Action, {type: T}>['payload'] & Extract<Action, {type: T}>['payload']
) => void;
