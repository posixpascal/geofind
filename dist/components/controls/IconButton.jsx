"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const react_1 = __importStar(require("react"));
const web_1 = require("@react-spring/web");
const IconButton = ({ onClick, children, variant = "primary", size = "md", disabled, full = false, loading = false, }) => {
    const [hover, setHover] = (0, react_1.useState)(false);
    const [focus, setFocus] = (0, react_1.useState)(false);
    const { scale } = (0, web_1.useSpring)({
        from: { scale: 1 },
        to: { scale: focus ? 0.95 : hover ? 1.05 : 1.0 },
        config: {
            duration: 300,
            mass: 0.1,
        },
    });
    const variants = {
        negative: "hover:bg-red-300 bg-red-200 dark:bg-red-900 dark:text-red-200",
        positive: "hover:bg-green-300 bg-green-200 dark:bg-green-900 dark:text-green-200",
        primary: "bg-tertiary text-headline fill-headline",
        secondary: "hover:bg-yellow-300 bg-yellow-200",
        plain: "",
    };
    const sizes = {
        sm: "py-2 px-4",
        md: "py-3 px-6",
        lg: "text-2xl py-5 px-10",
    };
    const variantClasses = variants[variant];
    const sizeClasses = sizes[size];
    let extraClasses = [];
    if (disabled) {
        extraClasses.push("opacity-50 grayscale bg-opacity-30 pointer-events-none");
    }
    return (<web_1.animated.button style={{ scale }} onClick={onClick} onMouseDown={() => setFocus(true)} onMouseUp={() => setFocus(false)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`theme-transition justify-center flex items-center text-lg gap-2 
            rounded-xl font-bold cursor-pointer ${variantClasses} ${sizeClasses} ${full ? "w-full text-center justify-center" : ""}
             ${extraClasses.join(" ")}
            `}>
      {children}
    </web_1.animated.button>);
};
exports.IconButton = IconButton;
