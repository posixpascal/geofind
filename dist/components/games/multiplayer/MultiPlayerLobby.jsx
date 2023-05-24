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
exports.MultiPlayerLobby = void 0;
const multiplayer_1 = require("@/state/multiplayer");
const react_1 = __importStar(require("react"));
const Box_1 = require("@/components/layout/Box");
const MultiPlayerPlayerListing_1 = require("@/components/games/multiplayer/MultiPlayerPlayerListing");
const GameMapSelection_1 = require("@/components/games/GameMapSelection");
const GameSettingsSelection_1 = require("@/components/games/GameSettingsSelection");
const PageHeader_1 = require("@/components/layout/PageHeader");
const Share_1 = require("@/components/controls/Share");
const IconButton_1 = require("@/components/controls/IconButton");
const GameModeSelection_1 = require("@/components/games/GameModeSelection");
const trpc_1 = require("@/utils/trpc");
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const react_2 = require("@legendapp/state/react");
const MultiPlayerLobby = () => {
    var _a;
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const multiPlayer = (0, react_2.useSelector)(() => multiplayer_1.multiPlayerState.get());
    const [settings, setSettings] = (0, react_1.useState)({});
    const update = trpc_1.trpc.multiplayer.update.useMutation({});
    const updateAction = (key) => async (newValue) => {
        console.log("updating", key, newValue);
        await update.mutateAsync({
            id: multiPlayer.id,
            [key]: newValue,
        });
    };
    const isCreator = ((_a = user.data) === null || _a === void 0 ? void 0 : _a.id) === multiPlayer.creatorId;
    return (<div>
      <PageHeader_1.PageHeader icon={<IconButton_1.IconButton size={"lg"} variant={"positive"} disabled={false}>
            Start Game
          </IconButton_1.IconButton>} title={`Raum: ${multiPlayer.roomCode}`} description={`Ein Spiel von ${multiPlayer.creator.name}`}/>
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"}>
        <div className={"col-span-1 md:col-span-2 flex flex-col gap-4"}>
          <Box_1.Box title={"Lobby"} mass={1.5}>
            <MultiPlayerPlayerListing_1.MultiPlayerPlayerListing />
          </Box_1.Box>

          <Box_1.Box title={"Settings"} delay={150} mass={1}>
            <div className={"grid grid-cols-2 gap-4"}>
              <div className={"col-span-1"}>
                <GameModeSelection_1.GameModeSelection readOnly={!isCreator} mode={multiPlayer.gameMode} setMode={updateAction("gameMode")}/>
              </div>
              <div className={"col-span-1"}>
                <GameMapSelection_1.GameMapSelection readOnly={!isCreator} map={multiPlayer.gameMap} setMap={updateAction("gameMap")}/>
              </div>
            </div>
            <hr />
            <GameSettingsSelection_1.GameSettingsSelection readOnly={!isCreator} updateAction={updateAction}/>
          </Box_1.Box>
        </div>
        <aside className={"md:col-span-2 lg:col-span-1 gap-4 flex-col flex"}>
          <Box_1.Box title={"Share"} description={"Invite your friends to this game by copying the link below:"} delay={300} mass={1}>
            <Share_1.Share url={window.location.href}/>
          </Box_1.Box>
        </aside>
      </div>
    </div>);
};
exports.MultiPlayerLobby = MultiPlayerLobby;
