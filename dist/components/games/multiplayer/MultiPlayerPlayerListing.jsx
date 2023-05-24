"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPlayerPlayerListing = void 0;
const multiplayer_1 = require("@/state/multiplayer");
const UserAvatar_1 = require("@/components/user/UserAvatar");
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const Tag_1 = require("@/components/utils/Tag");
const react_1 = require("react");
const Dialog_1 = require("@/components/layout/Dialog");
const UserCard_1 = require("../../user/UserCard");
const react_2 = require("@legendapp/state/react");
const MultiPlayerPlayerListing = () => {
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const [activeUser, setActiveUser] = (0, react_1.useState)(null);
    const multiPlayer = (0, react_2.useSelector)(() => multiplayer_1.multiPlayerState.get());
    const players = multiPlayer
        .sessions.filter((session) => session.state === "CONNECTED")
        .map((session) => session.user);
    return (<div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"}>
            {players.map((player) => {
            return (<div onClick={() => setActiveUser(player)} className={`flex col-span-1 will-change-transform items-center bg-background/80 rounded-xl p-3 gap-4`} key={player.id}>
                        <UserAvatar_1.UserAvatar width={48} height={48} user={player}/>
                        <div>
                            <h3 className={"text-lg font-bold"}>
                                {player.name} &bull; {player.friendCode}
                            </h3>
                            <div className={"flex gap-2"}>
                                {user.data.id === player.id && (<Tag_1.Tag variant={"blue"} title={"You"}/>)}
                                {multiPlayer.creatorId === player.id && (<Tag_1.Tag variant={"green"} title={"Creator"}/>)}
                            </div>
                        </div>
                    </div>);
        })}

            <Dialog_1.Dialog setOpen={() => setActiveUser(null)} open={!!activeUser}>
                {activeUser && (<UserCard_1.UserCard onClose={() => setActiveUser(null)} user={activeUser}/>)}
            </Dialog_1.Dialog>
        </div>);
};
exports.MultiPlayerPlayerListing = MultiPlayerPlayerListing;
