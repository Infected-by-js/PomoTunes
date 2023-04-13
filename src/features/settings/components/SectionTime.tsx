import {FC} from 'react';
import {ModeSettings} from '@/contexts/settings';
import {DividerHorizontal, SliderWithLabel} from '@/shared/components';

interface Props {
  modes: {[key in TimerMode]: ModeSettings};
  longBreakInterval: number;
  changeModeTime: (modeName: TimerMode, value: number) => void;
  changeLongBreakInterval: (value: number) => void;
  className?: HTMLDivElement['className'];
}

const SectionTime: FC<Props> = (props) => {
  const {modes, longBreakInterval, changeModeTime, changeLongBreakInterval, className} = props;

  return (
    <div className={className}>
      <DividerHorizontal label="Time" />

      <div className="mt-2">
        <SliderWithLabel
          label="Focus"
          color={modes.focus.color}
          value={modes.focus.time}
          labelFormatter={(v) => `${v}:00`}
          onChange={(v) => changeModeTime('focus', v)}
        />
      </div>

      <div className="mt-6">
        <SliderWithLabel
          label="Short break"
          color={modes.short_break.color}
          value={modes.short_break.time}
          labelFormatter={(v) => `${v}:00`}
          onChange={(v) => changeModeTime('short_break', v)}
        />
      </div>
      <div className="mt-6">
        <SliderWithLabel
          label="Long break"
          color={modes.long_break.color}
          value={modes.long_break.time}
          labelFormatter={(v) => `${v}:00`}
          onChange={(v) => changeModeTime('long_break', v)}
        />
      </div>

      <div className="mt-6">
        <SliderWithLabel
          label="Rounds until long break"
          color={'#B6AEE7'}
          value={longBreakInterval}
          min={1}
          max={16}
          onChange={(v) => changeLongBreakInterval(v)}
        />
      </div>
    </div>
  );
};

export default SectionTime;
