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
exports.UserExperience = void 0;
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const experience_1 = require("@/utils/experience");
const react_1 = __importStar(require("react"));
const ProgressBar_1 = require("../controls/ProgressBar");
const trpc_1 = require("@/utils/trpc");
const web_1 = require("@react-spring/web");
const ExperienceListItem_1 = require("../achievements/ExperienceListItem");
const LevelUp_1 = require("../achievements/LevelUp");
const singleplayer_1 = require("@/state/singleplayer");
const UserAvatar_1 = require("@/components/user/UserAvatar");
const react_2 = require("@legendapp/state/react");
const LEVEL_UP_ANIMATION_DURATION = 4000;
const TRAIL_HEIGHT = 45;
const UserExperience = () => {
    const singlePlayer = (0, react_2.useSelector)(() => singleplayer_1.singlePlayerState.get());
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const [levelUp, setLevelUp] = (0, react_1.useState)(false);
    const [trail, setTrail] = (0, react_1.useState)([]);
    const [experience, setExperience] = (0, react_1.useState)(0);
    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 300;
    const innerHeight = typeof window !== "undefined" ? window.innerHeight : 300;
    (0, react_1.useEffect)(() => {
        if (singlePlayer.roundState === "PREPARED") {
            setLevelUp(false);
            setTrail([]);
        }
    }, [singlePlayer]);
    trpc_1.trpc.session.experience.useSubscription(void 0, {
        onData(data) {
            if (window.oldExperience &&
                (0, experience_1.expLevel)(window.oldExperience) !== (0, experience_1.expLevel)(data.total)) {
                setLevelUp(true);
            }
            window.oldExperience = data.total;
            setExperience(data.total);
            setTrail(data.trail);
        },
    });
    const nextExpLevelAt = (0, react_1.useMemo)(() => {
        return (0, experience_1.nextExpLevel)(experience);
    }, [experience]);
    const expForLevel = (0, react_1.useMemo)(() => {
        return (0, experience_1.expForCurrentLevel)((0, experience_1.expLevel)(experience));
    }, [experience]);
    (0, react_1.useEffect)(() => {
        if (trail.length === 0) {
            return;
        }
        const timer = setTimeout(() => {
            setTrail([]);
        }, LEVEL_UP_ANIMATION_DURATION);
        return () => clearTimeout(timer);
    }, [trail]);
    const springApi = (0, web_1.useSpringRef)();
    const { background, opacity, left, bottom, width, height } = (0, web_1.useSpring)({
        ref: springApi,
        from: {
            opacity: 1,
            background: "white",
            height: 75,
            left: 20,
            bottom: 20,
            width: 300,
        },
        to: {
            scale: trail.length ? 1 : 1,
            opacity: levelUp ? 0 : 1,
            height: levelUp
                ? 400
                : trail.length
                    ? 75 + trail.length * TRAIL_HEIGHT
                    : 75,
            left: 20,
            bottom: 20,
            width: levelUp ? 350 : 300,
        },
    });
    const levelUpApi = (0, web_1.useSpringRef)();
    const { scale: levelUpScale } = (0, web_1.useSpring)({
        ref: levelUpApi,
        from: {
            height: 0,
            scale: 0,
        },
        to: {
            scale: levelUp ? 1 : 0,
        },
    });
    const transApi = (0, web_1.useSpringRef)();
    const transition = (0, web_1.useTransition)(trail.length ? trail : [], {
        ref: transApi,
        trail: 400 / trail.length,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });
    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    (0, web_1.useChain)(trail.length
        ? [springApi, transApi, levelUpApi]
        : [levelUpApi, transApi, springApi], [levelUp ? 0 : 0.4, levelUp ? 1.2 : 0.6, trail.length ? 0.1 : 0.6]);
    if (!user.data) {
        return <div></div>;
    }
    return (<div>
      <web_1.animated.div className={"overflow-hidden shadow-lg bg-white dark:bg-slate-900 dark:text-slate-200 bg-opacity-60 backdrop-blur absolute z-10 bottom-5 left-5 flex-col flex rounded-xl"} style={{
            height,
            width,
            left,
            bottom,
        }}>
        <web_1.animated.div style={{
            opacity,
            height: opacity.interpolate((x) => `${100 * x}%`),
            scale: opacity.interpolate((x) => `${x}`),
        }}>
          <div className={"flex p-3 gap-4"}>
            <UserAvatar_1.UserAvatar width={48} height={48}/>
            <web_1.animated.div style={{ opacity }}>
              <strong>Lvl. {(0, experience_1.expLevel)(experience)}</strong>
              <span className={"text-xs pl-2"}>
                Noch {nextExpLevelAt - experience} Exp
              </span>
              <div>
                <ProgressBar_1.ProgressBar start={expForLevel} current={experience} total={nextExpLevelAt}/>
              </div>
            </web_1.animated.div>
          </div>
        </web_1.animated.div>
        <web_1.animated.div style={{
            transformOrigin: "bottom left",
            opacity: levelUpScale.interpolate((x) => `${x}`),
            height: levelUpScale.interpolate((x) => `${100 * x}%`),
        }}>
          <LevelUp_1.LevelUp visible={levelUp} experience={experience} width={350} height={400}/>
        </web_1.animated.div>
        <div className={"flex flex-col px-5 pb-5"}>
          {transition((style, item) => (<web_1.animated.div style={{ ...style }}>
              <ExperienceListItem_1.ExperienceListItem type={item}/>
            </web_1.animated.div>))}
        </div>
      </web_1.animated.div>
    </div>);
};
exports.UserExperience = UserExperience;
