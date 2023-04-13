export {};

declare global {
  type TimerMode = 'focus' | 'short_break' | 'long_break';
}

declare module 'react' {
  type CssVariableInStyles = Record<`--${string}`, string>;

  export interface CSSProperties extends CssVariableInStyles {}
}
