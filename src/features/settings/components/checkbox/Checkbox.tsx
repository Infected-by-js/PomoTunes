import {FC, useState} from 'react';
import clsx from 'clsx';
import './Checkbox.css';

interface Props {
  value: boolean;
  onChange: (isChecked: boolean) => void;
  isDisabled?: boolean;
}

const Checkbox: FC<Props> = ({value, onChange, isDisabled = false}) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <label className={clsx('checkbox', {checked: isChecked, disabled: isDisabled})}>
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
