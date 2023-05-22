import {animated, useSpring} from "@react-spring/web";
import React, {ReactNode} from "react";

interface BoxProps {
  mass?: number;
  delay?: number;
  children: ReactNode;
  title: string;
  description?: string;
}

export const Box: React.FC<BoxProps> = ({
  title,
  description,
  children,
  delay = 0,
  mass = 2,
}) => {
  const { scale, opacity } = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay,
    config: { mass: 2 },
  });

  return (
    <animated.div
      style={{ scale, opacity }}
      className={
        "will-change-transform bg-card text-card-paragraph flex gap-8 items-center justify-between rounded-xl p-5"
      }
    >
      <div className={"flex flex-col gap-1 w-full"}>
        <div>
          <h2
            className={
              "text-2xl font-black flex items-center gap-4 text-card-headline"
            }
          >
            {title}
          </h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </animated.div>
  );
};
