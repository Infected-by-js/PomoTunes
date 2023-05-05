import {FC} from 'react';
import {ModesSettings} from '@/contexts/settings';
import {SliderWithLabel, SwitchBtn} from '@/shared/components';
import {secondsToMinutes} from '@/shared/utils/time-utils';

interface Props {
  modes: ModesSettings;
  longBreakInterval: number;
  isAutoFocus: boolean;
  isAutoBreaks: boolean;
  onChangeTime: (mode: TimerMode, time: number) => void;
  onChangeLongBreakInterval: (value: number) => void;
  onToggleAutoFocus: () => void;
  onToggleAutoBreaks: () => void;
}

const Settings: FC<Props> = ({
  modes,
  isAutoBreaks,
  isAutoFocus,
  longBreakInterval,
  onChangeTime,
  onChangeLongBreakInterval,
  onToggleAutoFocus,
  onToggleAutoBreaks,
}) => {
  const labelFormatter = (v: number) => {
    const {mm, ss} = secondsToMinutes(v * 60);
    return `${mm}:${ss}`;
  };
  return (
    <div className="fixed top-[100%] translate-y-1 left-1/2 -translate-x-1/2 z-100 bg-black/75 p-2 text-white/75 rounded-lg">
      <div className="bg-secondary p-2 rounded-lg space-y-1">
        <SliderWithLabel
          label="Focus"
          labelFormatter={labelFormatter}
          value={modes.focus.time}
          onChange={(v) => onChangeTime('focus', v)}
          min={1}
          max={90}
        />
        <SliderWithLabel
          label="Break short"
          labelFormatter={labelFormatter}
          value={modes.short_break.time}
          onChange={(v) => onChangeTime('short_break', v)}
          min={1}
          max={90}
        />
        <SliderWithLabel
          label="Break long"
          labelFormatter={labelFormatter}
          value={modes.long_break.time}
          onChange={(v) => onChangeTime('long_break', v)}
          min={1}
          max={90}
        />
      </div>

      <div className="bg-secondary p-2 rounded-lg mt-2">
        <SliderWithLabel
          label="Long breaks interval"
          value={longBreakInterval}
          min={0}
          max={9}
          onChange={onChangeLongBreakInterval}
        />
      </div>

      <div className="bg-secondary p-2 rounded-lg mt-2 space-y-2">
        <div className="flex items-center space-x-4">
          <span className="uppercase flex-1 text-sm">Auto focus</span>
          <SwitchBtn value={isAutoFocus} onChange={onToggleAutoFocus} height={20} width={40} />
        </div>

        <div className="flex items-center space-x-4">
          <span className="uppercase flex-1 text-sm">Auto breaks</span>
          <SwitchBtn
            value={isAutoBreaks}
            onChange={onToggleAutoBreaks}
            height={20}
            width={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
