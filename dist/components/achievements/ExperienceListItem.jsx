"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceListItem = void 0;
const react_1 = __importDefault(require("react"));
const exp_1 = require("@/server/constants/exp");
const next_intl_1 = require("next-intl");
const singleplayer_1 = require("@/state/singleplayer");
const react_2 = require("@legendapp/state/react");
const ExperienceListItem = ({ type, }) => {
    var _a, _b;
    const singlePlayer = (0, react_2.useSelector)(() => singleplayer_1.singlePlayerState.get());
    const t = (0, next_intl_1.useTranslations)("experience");
    let amount = exp_1.ExperienceValue[type];
    return (<div className={"flex py-2 justify-between"}>
      {t(`experiences.${type}`, {
            emoji: (_a = singlePlayer.country) === null || _a === void 0 ? void 0 : _a.flagEmoji,
            name: (_b = singlePlayer.country) === null || _b === void 0 ? void 0 : _b.nameCommon,
        })}
      <strong className={"text-right"}>+ {amount} Exp</strong>
    </div>);
};
exports.ExperienceListItem = ExperienceListItem;
