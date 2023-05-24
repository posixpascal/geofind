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
exports.getServerSideProps = void 0;
const router_1 = require("next/router");
const trpc_1 = require("@/utils/trpc");
const multiplayer_1 = require("@/state/multiplayer");
const react_1 = require("react");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const MultiPlayerLobby_1 = require("@/components/games/multiplayer/MultiPlayerLobby");
const react_2 = require("@legendapp/state/react");
const pick_1 = require("next/dist/lib/pick");
function MultiplayerPage() {
    const multiPlayer = (0, react_2.useSelector)(() => multiplayer_1.multiPlayerState.get());
    const [loading, setLoading] = (0, react_1.useState)(true);
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    trpc_1.trpc.multiplayer.subscribe.useSubscription({
        id: String(id),
    }, {
        onStarted() {
            setLoading(false);
        },
        onData(game) {
            multiplayer_1.multiPlayerState.set(game);
        },
    });
    const view = (0, react_1.useMemo)(() => {
        if (!multiPlayer) {
            return <></>;
        }
        if (multiPlayer.gameState === "LOBBY") {
            return <MultiPlayerLobby_1.MultiPlayerLobby />;
        }
        // if (multiPlayer.gameState === GameState.PLAYING) {
        //   return <MultiPlayerGame />;
        // }
        return <>Unsupported State: {multiPlayer.gameState}</>;
    }, [multiPlayer === null || multiPlayer === void 0 ? void 0 : multiPlayer.gameState]);
    return (<div>
      <LoadingSpinner_1.LoadingSpinner isLoading={loading}/>
      {view}
    </div>);
}
exports.default = MultiplayerPage;
const namespaces = ["common",
    "settings",
    "multiplayer",
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
