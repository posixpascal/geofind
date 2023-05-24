import { animated, useSpring } from "@react-spring/web";

interface ProgressBarProps {
  current: number;
  total: number;
  start: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  start,
  current,
  total,
}) => {
  const percentage = (100 * Math.max(0, current - start)) / (total - start);
  const { w } = useSpring({
    from: { w: 0 },
    w: percentage,
    config: { duration: 1000 },
  });

  return (
    <div>
      <div
        className={
          "bg-orange-100 flex items-center justify-between h-5 rounded-full ring-2 ring-orange-200 min-w-[200px]"
        }
      >
        <animated.div
          className={
            "bg-orange-400 flex min-w-[35px] h-5 rounded-full overflow-hidden flex items-center"
          }
          style={{
            width: w
              .interpolate({
                range: [0, 100],
                output: [0, 100],
              })
              .interpolate((x) => `${x}%`),
          }}
        >
          <span className={"text-xs text-white whitespace-pre px-2"}>
            {Math.round(percentage)}%
          </span>
        </animated.div>
      </div>
    </div>
  );
};
