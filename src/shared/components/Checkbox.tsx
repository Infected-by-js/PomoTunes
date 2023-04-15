import {ChangeEvent, FC, useState} from 'react';
import clsx from 'clsx';

interface Props {
  value: boolean;
  color?: string;
  onChange: (isChecked: boolean) => void;
  isDisabled?: boolean;
}

const Checkbox: FC<Props> = (props) => {
  const {value, onChange, color = 'var(--color-accent-500)', isDisabled = false} = props;
  const [isChecked, setIsChecked] = useState(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <label
      className={clsx('checkbox', {
        checked: isChecked,
        disabled: isDisabled,
      })}
      style={{'--color-checkbox': color}}
    >
      <input
        onChange={handleInputChange}
        disabled={isDisabled}
        type="checkbox"
        checked={isChecked}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
