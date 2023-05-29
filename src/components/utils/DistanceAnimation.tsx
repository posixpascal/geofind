import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState } from "react";

interface DistanceAnimationProps {
  distance: number;
}



export const DistanceAnimation: React.FC<DistanceAnimationProps> = ({
  distance,
}) => {
  const distanceCounter = useCountUp(distance);

  return (
    <div className={"text-center"}>
      Du bist ca.{" "}
      <span className={"font-bold"}>{distanceCounter.toFixed(2)}km</span>{" "}
      entfernt
    </div>
  );
};
