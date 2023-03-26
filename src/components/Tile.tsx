import { animated, to, useSpring } from "@react-spring/web";
import React, { ReactNode, useRef } from "react";
import { useGesture } from "@use-gesture/react";

interface TileProps {
  title: ReactNode;
  content: ReactNode;
  icon: ReactNode;
  tag?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
  interactive?: boolean;
}

const calcX = (y: number, ly: number) =>
  -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20;

export const Tile: React.FC<TileProps> = ({
  title,
  tag,
  content,
  icon,
  loading,
  children = [],
    interactive = true,
}) => {
  const target = useRef();
  const [{ scale, shadow }, api] = useSpring(() => ({
    scale: 1,
    shadow: 0,
    config: {
      mass: 2,
    },
  }));

  return (
    <animated.div
      ref={target}
      onMouseEnter={() => interactive && api({ scale: 1.1, shadow: 15 })}
      onMouseLeave={() => interactive && api({ scale: 1.0, shadow: 0 })}
      style={{
        boxShadow: to(
          [shadow],
          (s) => `${s / 2}px ${s / 2}px ${s}px #00000020`
        ),
        scale: to([scale], (s) => s),
      }}
      className="h-full bg-white text-left relative rounded-xl p-4
      cursor-pointer hover:shadow-2xl motion-reduce:transition-none
      dark:bg-slate-900 dark:text-slate-200
      focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-3"
    >
      <div className={"flex gap-2"}>
        <div className={"flex flex-col justify-between grow-1 w-full"}>
          <div className={"text-2xl font-black"}>{title}</div>
          <div>
            <span className={'text-lg text-gray-600 dark:text-slate-400'}>{content}</span>

            {tag && <div className="-mx-0 mt-2">{tag}</div>}
          </div>
          {children}
        </div>

        <div className={"flex text-6xl justify-start"}>{icon}</div>
      </div>
    </animated.div>
  );
};
