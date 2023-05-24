"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const web_1 = require("@react-spring/web");
const react_1 = __importDefault(require("react"));
const Tile = ({ title, tag, content, icon, children = [], interactive = true, }) => {
    const settings = { enableAnimations: true };
    const [{ scale, shadow }, api] = (0, web_1.useSpring)(() => ({
        scale: 1,
        shadow: 0,
        config: {
            mass: 2,
        },
    }));
    return (<web_1.animated.div onMouseEnter={() => settings.enableAnimations &&
            interactive &&
            api({ scale: 1.1, shadow: 15 })} onMouseLeave={() => settings.enableAnimations &&
            interactive &&
            api({ scale: 1.0, shadow: 0 })} style={{
            boxShadow: (0, web_1.to)([shadow], (s) => `${s / 2}px ${s / 2}px ${s}px #00000020`),
            scale: (0, web_1.to)([scale], (s) => s),
        }} className="max-w-4xl h-full bg-card text-left relative rounded-xl p-4
      cursor-pointer will-change-transform theme-transition
      focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-3">
      <div className={"flex gap-2"}>
        <div className={"flex flex-col justify-between grow-1 w-full"}>
          <div className={"text-2xl text-card-headline font-black"}>
            {title}
          </div>
          <div>
            <span className={"text-lg text-card-paragraph"}>{content}</span>

            {tag && <div className="-mx-0 mt-2">{tag}</div>}
          </div>
          {children}
        </div>

        <div className={"flex text-6xl justify-start"}>{icon}</div>
      </div>
    </web_1.animated.div>);
};
exports.Tile = Tile;
