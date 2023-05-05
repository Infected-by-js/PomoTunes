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
  width?: number;
}

const SliderWithLabel: FC<Props> = ({
  label,
  color,
  width,
  min = 1,
  max = 90,
  value,
  labelFormatter,
  onChange,
  isDisabled,
}) => {
  const [range, setRange] = useState(value);

  const generateBackground = () => {
    if (isDisabled) return 'rgba(255,255,255,0.1)';

    const bgColor = color ? color : 'var(--color-primary)';

    return generateBackgroundGradient({color: bgColor, value: range, min, max});
  };

  const updateSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRange(value);
    onChange(value);
  };

  return (
    <div className="flex items-center w-full space-x-4">
      <span className="uppercase whitespace-nowrap flex-1 text-sm">{label}</span>

      <input
        className="slider"
        type="range"
        step="1"
        disabled={isDisabled}
        min={min}
        max={max}
        value={range}
        style={{background: generateBackground(), width: width ? width + 'px' : 'auto'}}
        onChange={updateSlider}
      />

      <span className="ml-4 text-sm">{labelFormatter ? labelFormatter(range) : range}</span>
    </div>
  );
};

export default SliderWithLabel;
