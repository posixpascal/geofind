"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clickable = void 0;
const react_1 = __importDefault(require("react"));
const Clickable = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
};
exports.Clickable = Clickable;
