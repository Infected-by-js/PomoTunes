import {ChangeEvent, FC, useState} from 'react';
import {generateBackgroundGradient} from '@/shared/utils/helpers';

interface Props {
  label: string;
  value: number;
  min?: number;
  max?: number;
  color?: string;
  onChange: (value: number) => void;
  labelFormatter?: (value: number) => string | number;
  isDisabled?: boolean;
}

const SliderWithLabel: FC<Props> = (props) => {
  const {label, color, min = 1, max = 90, value, labelFormatter, onChange, isDisabled} = props;
  const [range, setRange] = useState(value);

  const generateBackground = () => {
    if (isDisabled) return 'rgba(0,0,0,0.1)';

    const bgColor = color ? color : 'var(--color-accent-500)';

    return generateBackgroundGradient({color: bgColor, value: range, min, max});
  };

  const updateSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center flex-col w-full">
      <div className="mb-2 flex items-center justify-between w-full">
        <span>{label}</span>
        <span
          className="ml-4 flex items-center justify-center text-sm font-bold text-dark min-w-[56px] h-6 rounded-lg px-1"
          style={{background: generateBackground()}}
        >
          {labelFormatter ? labelFormatter(range) : range}
        </span>
      </div>

      <input
        className="slider"
        type="range"
        step="1"
        disabled={isDisabled}
        min={min}
        max={max}
        value={range}
        style={{background: generateBackground()}}
        onChange={updateSlider}
      />
    </div>
  );
};

export default SliderWithLabel;
