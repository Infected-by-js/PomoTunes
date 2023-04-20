import {ChangeEvent, FC, useState} from 'react';
import {generateBackgroundGradient} from '@/shared/utils/helpers';

interface Props {
  value: number;
  min?: number;
  max?: number;
  color?: string;
  onChange: (value: number) => void;
  isDisabled?: boolean;
}

const Slider: FC<Props> = (props) => {
  const {color, min = 1, max = 90, value, onChange, isDisabled} = props;
  const [range, setRange] = useState(value);

  const generateBackground = () => {
    if (isDisabled) return 'rgba(0,0,0,0.1)';

    const bgColor = color ? color : 'var(--color-accent-500)';

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
      style={{background: generateBackground()}}
      onChange={updateSlider}
      onBlur={submitChanges}
    />
  );
};

export default Slider;
