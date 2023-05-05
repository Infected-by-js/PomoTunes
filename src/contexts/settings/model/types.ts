export interface ModeSettings {
  id: TimerMode;
  label: string;
  time: number;
  completed: number;
}

export type ModesSettings = {[key in TimerMode]: ModeSettings};
export interface State {
  videoId: string;
  mode: TimerMode;
  isAutoBreaks: boolean;
  isAutoFocus: boolean;
  longBreakInterval: number;
  modes: ModesSettings;
}

export type Action =
  | {type: 'setMode'; payload: {mode: TimerMode}}
  | {type: 'completeMode'; payload: {modeCompleted: TimerMode}}
  | {type: 'updateModeTime'; payload: {mode: TimerMode; time: number}}
  | {type: 'incrementModeCounter'; payload: {mode: TimerMode}}
  | {type: 'setLongBreakInterval'; payload: {interval: number}}
  | {type: 'changeVideoId'; payload: {id: string}}
  | {type: 'toggleAutoBreaks'; payload: null}
  | {type: 'toggleAutoStarts'; payload: null};

export type Dispatch = <T extends Action['type']>(
  type: T,
  payload?: Extract<Action, {type: T}>['payload'] & Extract<Action, {type: T}>['payload']
) => void;
