"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSwatch = void 0;
const ColorSwatch = ({ color }) => {
    return (<div className={"inline-flex h-8 w-8 rounded-full"} style={{ background: color }}></div>);
};
exports.ColorSwatch = ColorSwatch;
