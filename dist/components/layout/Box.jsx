"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const web_1 = require("@react-spring/web");
const react_1 = __importDefault(require("react"));
const Box = ({ title, description, children, delay = 0, mass = 2, }) => {
    const { scale, opacity } = (0, web_1.useSpring)({
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        delay,
        config: { mass: 2 },
    });
    return (<web_1.animated.div style={{ scale, opacity }} className={"will-change-transform bg-card text-card-paragraph flex gap-8 items-center justify-between rounded-xl p-5"}>
      <div className={"flex flex-col gap-1 w-full"}>
        <div>
          <h2 className={"text-2xl font-black flex items-center gap-4 text-card-headline"}>
            {title}
          </h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </web_1.animated.div>);
};
exports.Box = Box;
