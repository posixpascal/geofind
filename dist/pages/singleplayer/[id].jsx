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
const react_1 = __importStar(require("react"));
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const router_1 = require("next/router");
const trpc_1 = require("@/utils/trpc");
const singleplayer_1 = require("@/state/singleplayer");
// import {useMarker} from "@/hooks/useMarker";
const SinglePlayerRoundStatus_1 = require("@/components/games/singleplayer/SinglePlayerRoundStatus");
const UserExperience_1 = require("@/components/user/UserExperience");
// import {useSinglePlayer} from "@/hooks/useSinglePlayer";
const TriesIndicator_1 = require("@/components/games/panels/TriesIndicator");
const FactsIndicator_1 = require("@/components/games/panels/FactsIndicator");
const Overlay_1 = require("@/components/utils/Overlay");
const IconButton_1 = require("@/components/controls/IconButton");
const react_2 = require("@legendapp/state/react");
const dynamic_1 = __importDefault(require("next/dynamic"));
const pick_1 = require("next/dist/lib/pick");
const Map = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@/components/layout/Map'))), {
    loading: () => <LoadingSpinner_1.LoadingSpinner isLoading={true}/>
});
function Singleplayer() {
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const [map, setMap] = (0, react_1.useState)(null);
    const singlePlayer = (0, react_2.useSelector)(() => singleplayer_1.singlePlayerState.get());
    //const {marker} = useMarker({map});
    //useSinglePlayer(marker, singlePlayer, map);
    const back = async () => {
        await router.push("/");
    };
    trpc_1.trpc.singleplayer.subscribe.useSubscription({
        id: String(id),
    }, {
        onData(game) {
            singleplayer_1.singlePlayerState.set(game);
        },
    });
    return (<Map onMapHandle={setMap}>
            <Overlay_1.Overlay visible={singlePlayer.roundState === "PREPARED"}>
                <div className={"z-20 absolute left-4 top-4"}>
                    <IconButton_1.IconButton variant={"negative"} full={true} size={"sm"} onClick={back}>
                        Abbrechen
                    </IconButton_1.IconButton>
                </div>
                <LoadingSpinner_1.LoadingSpinner isLoading={!singlePlayer.id}/>
                <SinglePlayerRoundStatus_1.SinglePlayerRoundStatus singlePlayer={singlePlayer}/>
                <UserExperience_1.UserExperience />
                <TriesIndicator_1.TriesIndicator />
                <FactsIndicator_1.FactsIndicator />
            </Overlay_1.Overlay>
        </Map>);
}
exports.default = Singleplayer;
const namespaces = ["common",
    "experience",
    "menu"];
const getServerSideProps = async ({ locale, }) => {
    var _a;
    return {
        props: {
            messages: (0, pick_1.pick)((await (_a = `../../../public/locales/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a))))).default, namespaces),
        },
    };
};
exports.getServerSideProps = getServerSideProps;
