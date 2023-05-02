import {ChangeEvent, FC, useState} from 'react';
import {generateBackgroundGradient} from '@/shared/utils/helpers';

interface Props {
  value: number;
  min?: number;
  max?: number;
  color?: string;
  onChange: (value: number) => void;
  isDisabled?: boolean;
  width?: number;
}

const Slider: FC<Props> = (props) => {
  const {color, min = 1, max = 90, value, onChange, isDisabled, width} = props;
  const [range, setRange] = useState(value);

  const generateBackground = () => {
    if (isDisabled) return 'rgba(255,255,255,0.1)';

    const bgColor = color ? color : 'var(--color-primary)';

    return generateBackgroundGradient({color: bgColor, value: range, min, max});
  };

  const updateSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
  };

  const submitChanges = () => onChange(range);

  return (
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
      onBlur={submitChanges}
    />
  );
};

export default Slider;
