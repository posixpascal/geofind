import { animated, to, useSpring } from "@react-spring/web";
import React, { ReactNode, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import {useRecoilState} from "recoil";
import {Settings} from "@prisma/client";
import {settingsState} from "@/state/settings";

interface TileProps {
  title: string;
  content: string;
  icon: string;
  tag?: ReactNode;
  children?: ReactNode;
  interactive?: boolean;
}

export const Tile: React.FC<TileProps> = ({
  title,
  tag,
  content,
  icon,
  children = [],
    interactive = true,
}) => {
  //const [settings, setSettings] = useRecoilState<Partial<Settings>>(settingsState);
  const settings = {enableAnimations: true}
  const [{ scale, shadow }, api] = useSpring(() => ({
    scale: 1,
    shadow: 0,
    config: {
      mass: 2,
    },
  }));

  return (
    <animated.div
      onMouseEnter={() => settings.enableAnimations && interactive && api({ scale: 1.1, shadow: 15 })}
      onMouseLeave={() => settings.enableAnimations && interactive && api({ scale: 1.0, shadow: 0 })}
      style={{
        boxShadow: to(
          [shadow],
          (s) => `${s / 2}px ${s / 2}px ${s}px #00000020`
        ),
        scale: to([scale], (s) => s),
      }}
      className="max-w-4xl h-full bg-card text-left relative rounded-xl p-4
      cursor-pointer will-change-transform theme-transition
      focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-3"
    >
      <div className={"flex gap-2"}>
        <div className={"flex flex-col justify-between grow-1 w-full"}>
          <div className={"text-2xl text-card-headline font-black"}>{title}</div>
          <div>
            <span className={'text-lg text-card-paragraph'}>{content}</span>

            {tag && <div className="-mx-0 mt-2">{tag}</div>}
          </div>
          {children}
        </div>

        <div className={"flex text-6xl justify-start"}>{icon}</div>
      </div>
    </animated.div>
  );
};
