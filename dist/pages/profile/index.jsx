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
exports.getServerSideProps = void 0;
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const date_fns_1 = require("date-fns");
const IconButton_1 = require("@/components/controls/IconButton");
const react_1 = __importDefault(require("react"));
const trpc_1 = require("@/utils/trpc");
const web_1 = require("@react-spring/web");
const FriendList_1 = require("@/components/followers/FriendList");
const ProfileForm_1 = require("@/components/forms/ProfileForm");
const next_intl_1 = require("next-intl");
const settings_1 = require("@/state/settings");
const Container_1 = require("@/components/layout/Container");
const react_2 = require("@legendapp/state/react");
const dynamic_1 = __importDefault(require("next/dynamic"));
const pick_1 = require("next/dist/lib/pick");
const ExperienceList = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@/components/achievements/ExperienceList'))), {
    loading: () => <LoadingSpinner_1.LoadingSpinner isLoading={true}/>
});
function ProfilePage() {
    const settings = (0, react_2.useSelector)(() => settings_1.settingsState.get());
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const t = (0, next_intl_1.useTranslations)("profile");
    const achievements = trpc_1.trpc.achievements.medals.useQuery();
    const { scale, opacity } = (0, web_1.useSpring)({
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        config: { mass: 2 },
    });
    const { scale: scaleSmall, opacity: opacitySmall } = (0, web_1.useSpring)({
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        config: { mass: 1.5 },
        delay: 800,
    });
    const { scale: scaleBig, opacity: opacityBig } = (0, web_1.useSpring)({
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        config: { mass: 1 },
        delay: 400,
    });
    if (!user.data || user.isLoading || achievements.isLoading) {
        return <LoadingSpinner_1.LoadingSpinner isLoading={true}/>;
    }
    return (<Container_1.Container className={"flex flex-col gap-8"}>
      <div className={"grid w-full grid-cols-1 lg:grid-cols-3 gap-8"}>
        <web_1.animated.div style={{ scale, opacity }} className={"bg-card text-card-paragraph flex col-span-2 gap-8 items-center justify-between rounded-xl p-5"}>
          <div className={"col-span-1"}>
            <div className={"flex flex-col gap-1"}>
              <h2 className={"text-4xl font-black flex items-center gap-4 text-card-headline"}>
                {user.data.name}
                {settings.enableFriends && (<>
                    <span>&bull;</span>
                    <span className={""}>{user.data.friendCode}</span>
                  </>)}
              </h2>
              <p className={"text-2xl flex gap-8"}>
                <span>{achievements.data["RIBBON"]} 🎀</span>
                <span>{achievements.data["CROWN"]} 👑</span>
                <span>{achievements.data["GEM"]} 💎</span>
              </p>
              <p className={"text-xl"}>
                {t("joined", { at: (0, date_fns_1.format)(user.data.joinedAt, "dd.MM.yyyy") })}
              </p>
            </div>
          </div>
        </web_1.animated.div>
        <web_1.animated.div style={{ scale, opacity }}>
          <div className={"bg-card h-full text-card-paragraph flex gap-8 items-center justify-between rounded-xl p-5 text-right text-sm"}>
            <div className={"items-start flex-col w-full lg:justify-center h-full flex"}>
              <h2 className={"text-2xl font-black flex items-center gap-4 text-card-headline"}>
                {t("saveAccount")}
              </h2>
              {user.data.isGuest && (<p className={"text-card-paragraph mb-8"}>
                  {t("loggedInAsGuest")}
                </p>)}
              <div className={"flex w-full"}>
                <IconButton_1.IconButton full={true} size={"sm"}>
                  {t("registerNow")}
                </IconButton_1.IconButton>
              </div>
            </div>
          </div>
        </web_1.animated.div>
      </div>
      <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"}>
        <web_1.animated.div style={{ opacity: opacityBig, scale: scaleBig }} className={"grid-cols-1 xl:col-span-2 bg-card rounded-xl p-5"}>
          <ProfileForm_1.ProfileForm />
        </web_1.animated.div>
        <div className={"flex flex-col gap-4"}>
          {settings.enableFriends && (<web_1.animated.div style={{ opacity: opacitySmall, scale: scaleSmall }}>
              <div className={"bg-card rounded-xl p-5"}>
                <FriendList_1.FriendList />
              </div>
            </web_1.animated.div>)}
          {settings.enableExperience && (<web_1.animated.div style={{ opacity: opacitySmall, scale: scaleSmall }}>
              <div className={"bg-card rounded-xl p-5"}>
                  <ExperienceList />
              </div>
            </web_1.animated.div>)}
        </div>
      </div>
    </Container_1.Container>);
}
exports.default = ProfilePage;
const namespaces = ["common",
    "profile",
    "experience",
    "friends",
    "menu"];
const getServerSideProps = async ({ locale, }) => {
    var _a;
    return {
        props: {
            messages: (0, pick_1.pick)((await (_a = `../../../public/locales/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a))))).default, namespaces)
        },
    };
};
exports.getServerSideProps = getServerSideProps;
