interface CircleProps {
  size: number;
  strokeWidth: number;
  progress: number;
  countdown: boolean;
}

const CircleProgress: React.FC<CircleProps> = ({size, strokeWidth, progress, countdown}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (countdown ? 1 - progress / 100 : progress / 100);

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#ffd9d9"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#ff7c7c"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export default CircleProgress;
