"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeaderIcon = void 0;
const react_1 = __importDefault(require("react"));
const PageHeaderIcon = ({ icon }) => {
    return <span className={"text-7xl"}>{icon}</span>;
};
exports.PageHeaderIcon = PageHeaderIcon;
