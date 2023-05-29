import { multiPlayerState } from "@/state/multiplayer";
import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/Box";
import { PlayerList } from "@/components/game-lobby/PlayerList";
import { MapSelection } from "@/components/games/MapSelection";
import { GameSettings } from "@/components/games/GameSettings";
import { PageHeader } from "@/components/layout/PageHeader";
import { Share } from "@/components/utils/Share";
import { IconButton } from "@/components/ui/IconButton";
import { ModeSelection } from "@/components/games/ModeSelection";
import type { MultiPlayerGame } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSelector } from "@legendapp/state/react";
import { UserPinSelection } from "@/components/user/UserPinSelection";
import { useRouter } from "next/router";

export const PlayerLobby = () => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const multiPlayer = useSelector(() => multiPlayerState.get());
  const startMultiPlayerGame = trpc.multiplayer.startGame.useMutation();
  const update = trpc.multiplayer.update.useMutation({});

  useEffect(() => {
    if (multiPlayer && multiPlayer.gameState !== "LOBBY") {
      router.push(`/multiplayer/${multiPlayer.id}/play`);
    }
  }, [multiPlayer.gameState]);

  const updateAction: (key: keyof MultiPlayerGame) => any =
    (key: keyof MultiPlayerGame) => async (newValue: string) => {
      await update.mutateAsync({
        id: multiPlayer.id!,
        [key]: newValue,
      });
    };

  const isCreator = user.data?.id === multiPlayer.creatorId;
  const startGame = () => {
    startMultiPlayerGame
      .mutateAsync({
        id: multiPlayer.id,
      })
      .then(() => {
        router.push("/multiplayer/" + multiPlayer.id + "/lobby");
      });
  };

  return (
    <div>
      <PageHeader
        icon={
          isCreator && (
            <IconButton
              onClick={startGame}
              size={"lg"}
              variant={"positive"}
              disabled={false}
              data-cy={"start-multiplayer"}
            >
              Start Game
            </IconButton>
          )
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
            <PlayerList />
          </Box>

          <Box title={"Settings"} delay={150} mass={1}>
            <div className={"grid grid-cols-2 gap-4"}>
              <div className={"col-span-1"}>
                <ModeSelection
                  readOnly={!isCreator}
                  mode={multiPlayer.gameMode!}
                  setMode={updateAction("gameMode")}
                />
              </div>
              <div className={"col-span-1"}>
                <MapSelection
                  readOnly={!isCreator}
                  map={multiPlayer.gameMap!}
                  setMap={updateAction("gameMap")}
                />
              </div>
            </div>
            <hr />
            <GameSettings
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

          <Box
            title={"Deine Stecknadel"}
            description={"Hier kannst Du deine Stecknadel noch einmal anpassen"}
            mass={1.0}
            delay={500}
          >
            <UserPinSelection />
          </Box>
        </aside>
      </div>
    </div>
  );
};
