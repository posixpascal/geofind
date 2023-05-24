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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUp = void 0;
const react_confetti_1 = __importDefault(require("react-confetti"));
const react_1 = __importStar(require("react"));
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const experience_1 = require("@/utils/experience");
const web_1 = require("@react-spring/web");
const IconButton_1 = require("@/components/controls/IconButton");
const LevelUp = ({ visible, experience, width, height, }) => {
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const [confetti, setConfetti] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let timer;
        if (visible) {
            setTimeout(() => setConfetti(true), 2400);
        }
        return () => timer && clearTimeout(timer);
    }, [visible]);
    const newLevel = (0, experience_1.expLevel)(experience);
    const oldLevel = newLevel - 1;
    const { top, bottom } = (0, web_1.useSpring)({
        from: {
            top: 0,
            bottom: 150,
        },
        to: {
            top: visible ? -150 : 0,
            bottom: visible ? 0 : 150,
        },
        delay: 2400,
    });
    return (<div>
      {confetti && (<div className={"absolute inset-0 z-5"}>
          <react_confetti_1.default gravity={0.01} opacity={0.25} numberOfPieces={80} width={width} height={height}/>
        </div>)}

      <div className={"gap-2 flex flex-col p-7"}>
        <web_1.animated.div>
          <div className={"text-center text-4xl font-black"}>Glückwunsch!</div>
          <div className={"text-center mt-2 text-2xl"}>
            Du hast ein neues Level erreicht:
          </div>
        </web_1.animated.div>
        <div>
          <div className={"flex-col font-bold relative overflow-hidden w-full h-[120px] flex items-center justify-center"}>
            <web_1.animated.div style={{
            top,
        }} className={"absolute"}>
              <h1 className={"text-9xl"}>{oldLevel}</h1>
            </web_1.animated.div>
            <web_1.animated.div style={{
            top: bottom,
        }} className={"absolute"}>
              <h1 className={"text-9xl"}>{newLevel}</h1>
            </web_1.animated.div>
          </div>
          <div className={"text-gray-500 text-sm uppercase text-center"}>
            Level
          </div>
        </div>
        <div className={"flex mt-4 flex-col justify-center items-center gap-4"}>
          <div>
            <IconButton_1.IconButton variant={"primary"}>Erfolge ansehen</IconButton_1.IconButton>
          </div>
          {/*<div>*/}
          {/*    <IconButton variant={'positive'}>*/}
          {/*        Weiterspielen*/}
          {/*    </IconButton>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>);
};
exports.LevelUp = LevelUp;
