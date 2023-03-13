import { animated, useSpring } from "@react-spring/web";
import React, { ReactNode, useState } from "react";

interface TileProps {
  title: ReactNode;
  content: ReactNode;
  icon: ReactNode;
  tag?: ReactNode;
  loading?: boolean;
}

export const Tile: React.FC<TileProps> = ({
  title,
  tag,
  content,
  icon,
  loading,
}) => {
  const [hover, setHover] = useState(false);
  let interpolation = 0;
  let duration = 50;

  if (hover) {
    interpolation = 1;
  }

  if (loading) {
    interpolation = 2;
    duration = 200;
  }

  const { x } = useSpring({
    from: { x: 0 },
    x: interpolation,
    config: { duration },
  });

  return (
    <animated.div
      style={{
        zIndex: loading ? 10 : 0,
        transform: x
          .interpolate({
            range: [0, 1, 2],
            output: [1, 1.1, 30],
          })
          .interpolate((x) => `scale(${x})`),
        filter: x
          .interpolate({
            range: [0, 1, 2],
            output: [0, 0, 26],
          })
          .interpolate((x) => `blur(${x}px`),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-white text-left relative rounded-xl shadow-lg p-4
      cursor-pointer transition duration-300 hover:shadow-2xl motion-reduce:transition-none
      focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-3"
    >
      <div className={"flex gap-2"}>
        <div className={"flex flex-col grow-1 w-full"}>
          <div className={"text-2xl font-bold"}>{title}</div>
          <div>
            {content}

            {tag && <div className="-mx-0 mt-2">{tag}</div>}
          </div>
        </div>

        <div className={"flex justify-start"}>{icon}</div>
      </div>
    </animated.div>
  );
};
