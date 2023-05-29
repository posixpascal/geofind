import Map from "@/components/maps/Map";
import { useSelector } from "@legendapp/state/react";
import { multiPlayerState } from "@/state/multiplayer";
import { PlayerSynchronization } from "../maps/PlayerSynchronization";
import { trpc } from "@/utils/trpc";
import React from "react";
import { ScoreBoard } from "../maps/ScoreBoard";
import { RoundTimer } from "@/components/maps/RoundTimer";
import { MarkerListing } from "@/components/maps/MarkerListing";
import { MapMouseEvent } from "maplibre-gl";
import { RoundState } from "@prisma/client";
import {Overlay} from "@/components/utils/Overlay";
import {CountryPanel} from "@/components/maps/CountryPanel";
import {CountryPanelDialog} from "@/components/maps/CountryPanelDialog";

export const MultiPlayerLayout = () => {
  const multiPlayer = useSelector(() => multiPlayerState.get());
  const synchronizeSession = trpc.multiplayer.synchronizeSession.useMutation();
  const vote = trpc.multiplayer.vote.useMutation();
  const onMapLoaded = async () => {
    await synchronizeSession.mutateAsync({
      id: multiPlayer.id,
    });
  };

  const onCoordsChange = (event: MapMouseEvent) => {
    vote.mutateAsync({
      id: multiPlayer.id,
      vote: event.lngLat,
    });
  };

  const isPreparing =
      multiPlayer.synchronized && multiPlayer.roundState === RoundState.PREPARED;
  const isStarted =
      multiPlayer.synchronized && multiPlayer.roundState === RoundState.STARTED;

  return (
    <div>
      <Map
        withMarker={true}
        onCoordsChange={onCoordsChange}
        onMapLoaded={onMapLoaded}
      >
        <Overlay visible={isPreparing}>
          <CountryPanel visible={isPreparing} />
          <CountryPanelDialog visible={isStarted} />
        </Overlay>
        <PlayerSynchronization />

        <ScoreBoard
          visible={multiPlayer.roundState === RoundState.SCOREBOARD}
        />
        <RoundTimer />
        <MarkerListing />
      </Map>
    </div>
  );
};
