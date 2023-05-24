"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const react_1 = __importDefault(require("react"));
const Container = ({ className = "", children, }) => {
    return (<section className={`${className} max-w-7xl mx-auto`}>{children}</section>);
};
exports.Container = Container;
