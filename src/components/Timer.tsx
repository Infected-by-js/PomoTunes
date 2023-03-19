import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  secondsLeft: number;
}

const Timer: FC<Props> = ({ secondsLeft }) => {
  return <div>{secondsLeft}</div>;
};

export default Timer;
