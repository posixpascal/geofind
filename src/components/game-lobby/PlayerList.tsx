import { multiPlayerState } from "@/state/multiplayer";
import type { User } from "@prisma/client";
import { UserAvatar } from "@/components/user/UserAvatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Tag } from "@/components/utils/Tag";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { UserCard } from "../user/UserCard";
import { useSelector } from "@legendapp/state/react";

export const PlayerList = () => {
  const { user } = useCurrentUser();
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const multiPlayer = useSelector(() => multiPlayerState.get());

  const players = multiPlayer
    .sessions!.filter((session) => session.state === "CONNECTED")
    .map((session) => session.user);

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"}>
      {players.map((player) => {
        return (
          <div
            onClick={() => setActiveUser(player)}
            className={`flex col-span-1 will-change-transform items-center bg-background/80 rounded-xl p-3 gap-4`}
            key={player.id}
          >
            <UserAvatar width={48} height={48} user={player} />
            <div>
              <h3 className={"text-lg font-bold"}>
                {player.name} &bull; {player.friendCode}
              </h3>
              <div className={"flex gap-2"}>
                {user.data!.id === player.id && (
                  <Tag variant={"blue"} title={"You"} />
                )}
                {multiPlayer.creatorId === player.id && (
                  <Tag variant={"green"} title={"Creator"} />
                )}
              </div>
            </div>
          </div>
        );
      })}

      <Dialog setOpen={() => setActiveUser(null)} open={!!activeUser}>
        {activeUser && (
          <UserCard onClose={() => setActiveUser(null)} user={activeUser} />
        )}
      </Dialog>
    </div>
  );
};
