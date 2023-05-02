import {FC} from 'react';
import {IconType} from 'react-icons';
import Switch from 'react-switch';

interface Props {
  onChange: () => void;
  value: boolean;
  iconOff?: IconType;
  iconOn?: IconType;
  iconSize?: number;
  width?: number;
  height?: number;
}

const SwitchBtn: FC<Props> = ({
  value,
  iconOff: IconOff,
  iconOn: IconOn,
  onChange,
  height,
  width,
}) => {
  return (
    <Switch
      onChange={onChange}
      checked={value}
      handleDiameter={height ? height - 4 : 26}
      offColor="#1f1f2a"
      onColor="#f3a952"
      height={height ? height : 30}
      width={width ? width : 62}
      activeBoxShadow="0px 0px 0px 0px transparent"
      uncheckedIcon={
        IconOff ? (
          <div className="flex justify-center items-center h-full text-white">
            <IconOff />
          </div>
        ) : (
          false
        )
      }
      checkedIcon={
        IconOn ? (
          <div className="flex justify-center items-center h-full text-white">
            <IconOn />
          </div>
        ) : (
          false
        )
      }
    />
  );
};

export default SwitchBtn;
