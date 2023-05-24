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
const trpc_1 = require("@/utils/trpc");
const AchievementGroup_1 = require("@/components/achievements/AchievementGroup");
const react_1 = __importDefault(require("react"));
const SpottedCountriesMap_1 = require("@/components/achievements/SpottedCountriesMap");
const Container_1 = require("@/components/layout/Container");
const PageHeader_1 = require("@/components/layout/PageHeader");
const next_intl_1 = require("next-intl");
const pick_1 = require("next/dist/lib/pick");
function ProfileAchievementsPage() {
    const t = (0, next_intl_1.useTranslations)("achievements");
    const achievements = trpc_1.trpc.achievements.all.useQuery();
    if (achievements.isLoading) {
        return <div>Loading...</div>;
    }
    if (!achievements.data) {
        return <div>Something went wrong</div>;
    }
    const allAchievements = achievements.data;
    const groups = Array.from(new Set(allAchievements.map((achievement) => achievement.type)));
    return (<Container_1.Container>
      <PageHeader_1.PageHeader title={t("countriesTitle")} description={t("countriesDescription", { found: 0, total: 241 })}/>
      <div className={"relative min-h-[550px] bg-[#d8f2ff] rounded-xl shadow-lg overflow-hidden"}>
        <SpottedCountriesMap_1.SpottedCountriesMap />
      </div>
      <div className={"pt-8"}>
        {groups.map((group) => (<AchievementGroup_1.AchievementGroup type={group} achievements={allAchievements.filter(({ type }) => type === group)} key={group}/>))}
      </div>
    </Container_1.Container>);
}
exports.default = ProfileAchievementsPage;
const namespaces = ["common",
    "menu",
    "achievements"];
const getServerSideProps = async ({ locale, }) => {
    var _a;
    return {
        props: {
            messages: (0, pick_1.pick)((await (_a = `../../../public/locales/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a))))).default, namespaces)
        },
    };
};
exports.getServerSideProps = getServerSideProps;
