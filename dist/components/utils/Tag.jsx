"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const react_1 = __importDefault(require("react"));
const Tag = ({ title, variant }) => {
    const variants = {
        blue: "bg-blue-100 text-blue-800",
        green: "bg-green-100 text-green-800",
        orange: "bg-orange-100 text-orange-800",
        purple: "bg-purple-100 text-purple-800",
        red: "bg-red-100 text-red-800",
        gray: "bg-gray-100 text-gray-800",
    };
    return (<span className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${variants[variant]}`}>
      {title}
    </span>);
};
exports.Tag = Tag;
