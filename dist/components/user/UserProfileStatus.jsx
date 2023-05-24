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
exports.UserProfileStatus = void 0;
const UserAvatar_1 = require("@/components/user/UserAvatar");
const experience_1 = require("@/utils/experience");
const react_1 = __importStar(require("react"));
const settings_1 = require("@/state/settings");
const next_intl_1 = require("next-intl");
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const react_2 = require("@legendapp/state/react");
const UserProfileStatus = () => {
    const settings = (0, react_2.useSelector)(() => settings_1.settingsState.get());
    const t = (0, next_intl_1.useTranslations)();
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const [experience, setExperience] = (0, react_1.useState)(0);
    return (<div className={"flex items-center gap-4"}>
      <UserAvatar_1.UserAvatar width={64} height={64}/>
      <div className={"flex flex-col flex-grow"}>
        <div className={"leading-6 text-md md:text-xl"}>
          Hallo,&nbsp;
          <span className={"font-bold"}>
            {user.data ? user.data.name : t("loading")}
          </span>
        </div>

        <div className={"gap-1 flex text-sm md:text-md"}>
          {settings.enableExperience && user.data && (<div className={"flex"}>Lvl. {(0, experience_1.expLevel)(experience)}</div>)}
          <div className={"flex"}></div>
        </div>
      </div>
    </div>);
};
exports.UserProfileStatus = UserProfileStatus;
