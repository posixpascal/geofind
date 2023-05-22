import {multiPlayerState} from "@/state/multiplayer";
import React, {useState} from "react";
import {Box} from "@/components/layout/Box";
import {MultiPlayerPlayerListing} from "@/components/games/multiplayer/MultiPlayerPlayerListing";
import {GameMapSelection} from "@/components/games/GameMapSelection";
import {GameSettingsSelection} from "@/components/games/GameSettingsSelection";
import {PageHeader} from "@/components/layout/PageHeader";
import {Share} from "@/components/controls/Share";
import {IconButton} from "@/components/controls/IconButton";
import {GameModeSelection} from "@/components/games/GameModeSelection";
import {MultiPlayerGame} from "@prisma/client";
import {trpc} from "@/utils/trpc";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useSelector} from "@legendapp/state/react";

export const MultiPlayerLobby = () => {
  const { user } = useCurrentUser();
  const multiPlayer = useSelector(() => multiPlayerState.get());
  const [settings, setSettings] = useState({});
  const update = trpc.multiplayer.update.useMutation({});
  const updateAction: (key: keyof MultiPlayerGame) => any =
    (key: keyof MultiPlayerGame) => async (newValue: string) => {
      console.log("updating", key, newValue);
      await update.mutateAsync({
        id: multiPlayer.id!,
        [key]: newValue,
      });
    };

  const isCreator = user.data?.id === multiPlayer.creatorId;

  return (
    <div>
      <PageHeader
        icon={
          <IconButton size={"lg"} variant={"positive"} disabled={false}>
            Start Game
          </IconButton>
        }
        title={`Raum: ${multiPlayer.roomCode}`}
        description={`Ein Spiel von ${multiPlayer.creator.name}`}
      />
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
        }
      >
        <div className={"col-span-1 md:col-span-2 flex flex-col gap-4"}>
          <Box title={"Lobby"} mass={1.5}>
            <MultiPlayerPlayerListing />
          </Box>

          <Box title={"Settings"} delay={150} mass={1}>
            <div className={"grid grid-cols-2 gap-4"}>
              <div className={"col-span-1"}>
                <GameModeSelection
                  readOnly={!isCreator}
                  mode={multiPlayer.gameMode!}
                  setMode={updateAction("gameMode")}
                />
              </div>
              <div className={"col-span-1"}>
                <GameMapSelection
                  readOnly={!isCreator}
                  map={multiPlayer.gameMap!}
                  setMap={updateAction("gameMap")}
                />
              </div>
            </div>
            <hr />
            <GameSettingsSelection
              readOnly={!isCreator}
              updateAction={updateAction}
            />
          </Box>
        </div>
        <aside className={"md:col-span-2 lg:col-span-1 gap-4 flex-col flex"}>
          <Box
            title={"Share"}
            description={
              "Invite your friends to this game by copying the link below:"
            }
            delay={300}
            mass={1}
          >
            <Share url={window.location.href} />
          </Box>
        </aside>
      </div>
    </div>
  );
};
