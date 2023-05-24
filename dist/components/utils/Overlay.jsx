"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = void 0;
const web_1 = require("@react-spring/web");
const Overlay = ({ visible, children }) => {
    const style = (0, web_1.useSpring)({
        from: {
            opacity: 0,
        },
        to: {
            opacity: visible ? 1 : 0,
        },
    });
    return (<>
      <web_1.animated.div style={style} className={"fixed inset-0 pointer-events-none bg-black/80 backdrop-blur-lg z-0"}></web_1.animated.div>
      <div className={"z-10"}>{children}</div>
    </>);
};
exports.Overlay = Overlay;
