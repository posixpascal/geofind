import { LocaleName } from "../../../types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { Map } from "@/components/Map";
import maplibregl, { Marker } from "maplibre-gl";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { RoundState, SinglePlayerGame } from "@prisma/client";
import { useRecoilState } from "recoil";
import { singlePlayerState } from "@/state/singleplayer";
import { useMarker } from "@/hooks/useMarker";
import { RoundPreparedDialog } from "@/components/RoundPreparedDialog";
import { UserExperience } from "@/components/UserExperience";
import { useSinglePlayer } from "@/hooks/useSinglePlayer";
import { TriesIndicator } from "@/components/TriesIndicator";

export default function Singleplayer() {
  const router = useRouter();
  const { id } = router.query;
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [singlePlayer, setSinglePlayer] = useRecoilState(singlePlayerState);

  useEffect(() => {
    return () => {
      setSinglePlayer({});
    };
  }, []);

  const { marker } = useMarker({ map });
  useSinglePlayer(marker, singlePlayer, map);

  trpc.singleplayer.subscribe.useSubscription(
    {
      id: String(id),
    },
    {
      onData(game: SinglePlayerGame) {
        setSinglePlayer(game);
      },
    }
  );

  return (
    <Map onMapHandle={setMap}>
      {!singlePlayer ? <LoadingSpinner /> : <></>}
      <RoundPreparedDialog state={singlePlayer.roundState} />
      <UserExperience />
      <TriesIndicator />
    </Map>
  );
}

export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "experience",
        "menu",
      ])),
    },
  };
};
