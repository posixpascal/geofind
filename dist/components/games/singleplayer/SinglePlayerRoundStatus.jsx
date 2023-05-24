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
exports.SinglePlayerRoundStatus = void 0;
const react_1 = __importStar(require("react"));
const web_1 = require("@react-spring/web");
const next_intl_1 = require("next-intl");
const IconButton_1 = require("@/components/controls/IconButton");
const router_1 = require("next/router");
const marker_1 = require("@/state/marker");
const trpc_1 = require("@/utils/trpc");
const geo_1 = require("@/utils/geo");
const timings_1 = require("@/server/constants/timings");
const DistanceAnimation_1 = require("../panels/DistanceAnimation");
const react_2 = require("@legendapp/state/react");
const SinglePlayerRoundStatus = ({ singlePlayer, }) => {
    var _a, _b;
    const router = (0, router_1.useRouter)();
    const t = (0, next_intl_1.useTranslations)();
    const style = (0, web_1.useSpring)({
        config: { duration: 300 },
    });
    const [distance, setDistance] = (0, react_1.useState)(0);
    const marker = (0, react_2.useSelector)(() => marker_1.markerState.get());
    const timesFound = trpc_1.trpc.countries.timesFound.useQuery({
        id: singlePlayer.countryId,
    });
    const vote = trpc_1.trpc.singleplayer.vote.useMutation();
    const skip = trpc_1.trpc.singleplayer.skip.useMutation();
    const prepare = trpc_1.trpc.singleplayer.prepare.useMutation();
    const { locale } = (0, router_1.useRouter)();
    const submitVote = () => {
        vote
            .mutateAsync({
            id: singlePlayer.id,
            lngLat: {
                lng: marker.lng,
                lat: marker.lat,
            },
        })
            .then((result) => {
            if (result) {
                const [country] = result;
                const distance = (0, geo_1.distanceBetween)([marker.lng, marker.lat], [country.lng, country.lat]);
                setDistance(distance);
            }
        });
    };
    (0, react_1.useEffect)(() => {
        if (distance) {
            let timer = setTimeout(() => {
                setDistance(0);
            }, timings_1.SINGLEPLAYER_ERROR_TIME);
            return () => clearTimeout(timer);
        }
    }, [distance]);
    const submitSkip = () => {
        skip
            .mutateAsync({
            id: singlePlayer.id,
        })
            .then((result) => {
            console.log(result);
        });
    };
    const submitNext = () => {
        prepare.mutateAsync({
            id: singlePlayer.id,
        });
    };
    if (!singlePlayer.country) {
        return <div></div>;
    }
    const country = singlePlayer.country;
    return (<div className={"transform-gpu shadow-xl m-5 p-4 rounded-xl -translate-x-2/4 bg-card bg-opacity-60 backdrop-blur  left-[50%] absolute max-w-xl w-full top-0"}>
      <web_1.animated.div style={style}>
        <div className={"grid grid-cols-3 items-center justify-center text-center gap-2"}>
          <div className={"col-span-1 text-xl"}>Gesucht wird</div>
          <div className={"text-7xl"}>{(_a = singlePlayer.country) === null || _a === void 0 ? void 0 : _a.flagEmoji}</div>
          <div className={"text-xl font-bold"}>
            {(_b = singlePlayer.country) === null || _b === void 0 ? void 0 : _b.nameCommon}
          </div>
        </div>
        {distance > 0 && <DistanceAnimation_1.DistanceAnimation distance={distance}/>}
        {distance === 0 && singlePlayer.roundState === "SUCCESS" && (<div>
            <div className={"text-center"}>
              <p>✅Gefunden nach {singlePlayer.trialsForRound} Runde!</p>
              <p className={"text-sm"}>Insgesamt {timesFound.data}x gefunden</p>
            </div>
            <div className={"grid px-3 grid-cols-2 gap-8 mt-4"}>
              <IconButton_1.IconButton variant={"positive"} full={true} size={"sm"} onClick={submitNext}>
                Weiter
              </IconButton_1.IconButton>
            </div>
          </div>)}
        {distance === 0 && singlePlayer.roundState === "STARTED" && (<div className={"grid px-3 grid-cols-2 gap-8 mt-4"}>
            <div>
              <IconButton_1.IconButton variant={"secondary"} full={true} size={"sm"} onClick={submitSkip}>
                Auflösen
              </IconButton_1.IconButton>
            </div>
            <div>
              <IconButton_1.IconButton variant={"positive"} full={true} size={"sm"} onClick={submitVote}>
                Raten
              </IconButton_1.IconButton>
            </div>
          </div>)}

        {!distance && singlePlayer.roundState === "ENDED" && (<div>
            <div>
              <IconButton_1.IconButton variant={"positive"} full={true} size={"sm"} onClick={submitNext}>
                Nächste Frage
              </IconButton_1.IconButton>
            </div>
          </div>)}
      </web_1.animated.div>
    </div>);
};
exports.SinglePlayerRoundStatus = SinglePlayerRoundStatus;
