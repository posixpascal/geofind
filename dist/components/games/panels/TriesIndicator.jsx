"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriesIndicator = void 0;
const react_1 = require("react");
const singleplayer_1 = require("@/state/singleplayer");
const react_2 = require("@legendapp/state/react");
const TriesIndicator = () => {
    const singlePlayer = (0, react_2.useSelector)(() => singleplayer_1.singlePlayerState.get());
    const trials = (0, react_1.useMemo)(() => {
        return (<div>
        {singlePlayer.trialsForRound} / {singlePlayer.maxTrials}
      </div>);
    }, [singlePlayer]);
    return (<div className={"absolute font-impact leading-6 bottom-5 p-4 backdrop-blur bg-opacity-60 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-xl shadow-lg right-5 text-3xl font-black"}>
      {trials}
    </div>);
};
exports.TriesIndicator = TriesIndicator;
