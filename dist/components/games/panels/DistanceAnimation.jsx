"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceAnimation = void 0;
const react_1 = require("react");
const useCountUp = (to, duration = 300) => {
    const [count, setCount] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (count >= to) {
            return;
        }
        let timer = setInterval(() => {
            setCount((count) => count + to / duration);
        }, duration / to);
        return () => clearInterval(timer);
    }, [count]);
    return Math.min(to, count);
};
const DistanceAnimation = ({ distance, }) => {
    const distanceCounter = useCountUp(distance);
    return (<div className={"text-center"}>
      Du bist ca.{" "}
      <span className={"font-bold"}>{distanceCounter.toFixed(2)}km</span>{" "}
      entfernt
    </div>);
};
exports.DistanceAnimation = DistanceAnimation;
