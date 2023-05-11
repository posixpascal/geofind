import {useRecoilState} from "recoil";
import {multiPlayerState} from "@/state/multiplayer";
import {GameSessionState, User} from "@prisma/client";
import {UserAvatar} from "@/components/UserAvatar";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {Tag} from "@/components/Tag";
import {useState} from "react";
import {Dialog} from "@/components/Dialog";
import { UserCard } from "./UserCard";

export const MultiPlayerPlayerListing = () => {
    const {user} = useCurrentUser();
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [multiPlayer, setMultiPlayer] = useRecoilState(multiPlayerState);

    const players = multiPlayer.sessions!
        .filter(session => session.state === GameSessionState.CONNECTED)
        .map(session => session.user);

    return <div className={'grid grid-cols-3 gap-4'}>
        {players.map(player => {
            return <div
                onClick={() => setActiveUser(player)}
                className={`flex col-span-1 will-change-transform items-center bg-background/80 rounded-xl p-3 gap-4`}
                key={player.id}>
                <UserAvatar width={48} height={48} user={player}/>
                <div>
                    <h3 className={'text-lg font-bold'}>{player.name} &bull; {player.friendCode}</h3>
                    <div className={'flex gap-2'}>
                        {user.data!.id === player.id && <Tag variant={'blue'} title={'You'}/>}
                        {multiPlayer.creatorId === player.id && <Tag variant={'green'} title={'Creator'}/>}
                    </div>
                </div>
            </div>
        })}

        <Dialog setOpen={() => setActiveUser(null)} open={!!activeUser}>
            {activeUser && <UserCard user={activeUser} />}
        </Dialog>
    </div>
}