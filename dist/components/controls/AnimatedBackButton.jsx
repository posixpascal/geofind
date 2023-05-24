"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedBackButton = void 0;
const IconButton_1 = require("@/components/controls/IconButton");
const back_svg_1 = __importDefault(require("@/assets/svgs/icons/back.svg"));
const web_1 = require("@react-spring/web");
const react_1 = __importDefault(require("react"));
const router_1 = require("next/router");
const AnimatedBackButton = () => {
    const { route, back, push } = (0, router_1.useRouter)();
    const hasBackButton = route.includes("/multiplayer") ||
        route.includes("/singleplayer") ||
        route.includes("/profile") ||
        route.includes("/feedback") ||
        route.includes("/competitive");
    const { x } = (0, web_1.useSpring)({
        from: { x: 0 },
        x: hasBackButton ? 1 : 0,
    });
    return (<web_1.animated.div className={"absolute z-0"} style={{
            opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
            transform: x
                .interpolate({ range: [0, 1], output: [0, 70] })
                .interpolate((x) => `translateX(-${x}%)`),
        }}>
      <IconButton_1.IconButton size={"sm"} onClick={back}>
        <back_svg_1.default className={"h-8 w-8"}/>
      </IconButton_1.IconButton>
    </web_1.animated.div>);
};
exports.AnimatedBackButton = AnimatedBackButton;
