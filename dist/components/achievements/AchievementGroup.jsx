"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementGroup = void 0;
const react_1 = __importDefault(require("react"));
const AchievementListing_1 = require("@/components/achievements/AchievementListing");
const next_intl_1 = require("next-intl");
const web_1 = require("@react-spring/web");
const PageHeader_1 = require("@/components/layout/PageHeader");
const AchievementGroup = ({ type, achievements, }) => {
    const t = (0, next_intl_1.useTranslations)("achievements");
    const transition = (0, web_1.useTransition)(achievements.length ? achievements : [], {
        trail: 1500 / achievements.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });
    const minHeight = Math.ceil(achievements.length / 3) * 180 + "px";
    return (<>
      <PageHeader_1.PageHeader title={t("groups." + type)} description={""}/>
      <div className={"grid grid-cols-3 gap-6"} style={{ minHeight }}>
        {transition((style, achievement) => (<web_1.animated.div style={{ ...style }}>
            <AchievementListing_1.AchievementListing achievement={achievement} key={achievement.id}/>
          </web_1.animated.div>))}
      </div>
    </>);
};
exports.AchievementGroup = AchievementGroup;
