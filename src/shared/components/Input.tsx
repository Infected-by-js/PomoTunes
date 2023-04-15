import {ChangeEvent, FC, useState} from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const Input: FC<Props> = ({value, onChange}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setInputValue(newValue);
  };

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();

    if (newValue === value) return;

    if (!newValue) {
      setInputValue(value);
      return;
    }

    onChange(newValue);
  };

  return (
    <input
      className="input w-44"
      type="text"
      value={inputValue}
      onChange={handleInputValue}
      onBlur={handleSubmit}
      placeholder="Enter Video ID"
      spellCheck="false"
    />
  );
};

export default Input;
