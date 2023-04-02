import React from "react";
import { Dialog } from "./Dialog";
import { Backdrop } from "@/components/Backdrop";
import { RoundState } from "@prisma/client";
import { animated, useSpring } from "@react-spring/web";

interface RoundPreparedDialogProps {
  state?: RoundState;
}
export const RoundPreparedDialog: React.FC<RoundPreparedDialogProps> = ({
  state,
}) => {
  const { x } = useSpring({
    from: { x: 0 },
    x: state === "PREPARED" ? 1 : 0,
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={{
        pointerEvents: "none",
        opacity: x
          .interpolate({
            range: [0, 1],
            output: [0, 1],
          })
          .interpolate((x) => `${x}`),
      }}
    >
    </animated.div>
  );
};
