"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementListing = void 0;
const ProgressBar_1 = require("@/components/controls/ProgressBar");
const next_intl_1 = require("next-intl");
const trpc_1 = require("@/utils/trpc");
const Tile_1 = require("@/components/layout/Tile");
const react_1 = __importDefault(require("react"));
const AchievementListing = ({ achievement, }) => {
    const t = (0, next_intl_1.useTranslations)("achievements");
    const progress = trpc_1.trpc.achievements.progress.useQuery({
        achievement: achievement.id,
    }, {});
    const iconForType = {
        "CROWN": "👑",
        "GEM": "💎",
        "RIBBON": "🎀",
    };
    const icon = iconForType[achievement.medal];
    if (progress.isLoading || !progress.data) {
        return <div></div>;
    }
    const awarded = progress.data.awarded;
    return (<div className={`h-full ${awarded ? "" : "grayscale"}`}>
      <Tile_1.Tile title={t(achievement.type + "." + achievement.name + ".title")} content={t(achievement.type + "." + achievement.name + ".description")} icon={icon}>
        {awarded && (<div className={"pt-4"}>
            <ProgressBar_1.ProgressBar current={255} total={255} start={0}/>
          </div>)}

        {!awarded && (<div className={"pt-4"}>
            {/*<ProgressBar*/}
            {/*    current={progress.data!.progress}*/}
            {/*    total={progress.data!.total}*/}
            {/*    start={0}*/}
            {/*/>*/}
          </div>)}
      </Tile_1.Tile>
    </div>);
};
exports.AchievementListing = AchievementListing;
