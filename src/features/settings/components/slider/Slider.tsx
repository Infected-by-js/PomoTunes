import React, {FC, useState} from 'react';
import './Slider.css';

interface Props {
  label: string;
  value: number;
  color?: string;
  onChange: (value: number) => void;
  isDisabled?: boolean;
}

const OPTIONS = {
  min: 1,
  max: 90,
};

const Slider: FC<Props> = ({label, color, value, onChange, isDisabled}) => {
  const [range, setRange] = useState(value);

  const generateBackground = () => {
    if (isDisabled) return 'rgba(0,0,0,0.1)';

    const percentage = ((range - OPTIONS.min) / (OPTIONS.max - OPTIONS.min)) * 100;
    const bgColor = color ? color : 'var(--color-accent-500)';
    return `linear-gradient(to right, ${bgColor} ${percentage}%, rgba(0, 0, 0, 0.1) ${percentage}%)`;
  };

  const updateSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center flex-col w-full">
      <div className="mb-2 flex items-center justify-between w-full">
        <span>{label}</span>
        <span
          className="flex items-center justify-center text-sm font-bold text-dark w-14 h-6 rounded-lg"
          style={{background: generateBackground()}}
        >
          {range}:00
        </span>
      </div>

      <input
        className="slider"
        type="range"
        step="1"
        disabled={isDisabled}
        min={OPTIONS.min}
        max={OPTIONS.max}
        value={range}
        style={{background: generateBackground()}}
        onChange={updateSlider}
      />
    </div>
  );
};

export default Slider;
