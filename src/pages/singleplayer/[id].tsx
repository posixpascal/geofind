import { LocaleName } from "../../../types";
import React, { useEffect, useState } from "react";
import type { Map as MapGL } from "maplibre-gl";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { RoundState, SinglePlayerGame } from "@prisma/client";
import { singlePlayerState } from "@/state/singleplayer";
// import {useMarker} from "@/hooks/useMarker";
import { SinglePlayerControlBar } from "@/components/games/SinglePlayerControlBar";
import { UserExperience } from "@/components/user/UserExperience";
// import {useSinglePlayer} from "@/hooks/useSinglePlayer";
import { TriesPanel } from "@/components/maps/TriesPanel";
import { FactsPanel } from "@/components/maps/FactsPanel";
import { Overlay } from "@/components/utils/Overlay";
import { IconButton } from "@/components/ui/IconButton";
import { useSelector } from "@legendapp/state/react";
import dynamic from "next/dynamic";
import { pick } from "next/dist/lib/pick";

const Map = dynamic(() => import("@/components/maps/Map"), {
  loading: () => <LoadingSpinner isLoading={true} />,
});

export default function Singleplayer() {
  const router = useRouter();
  const { id } = router.query;
  const [map, setMap] = useState<MapGL | null>(null);
  const singlePlayer = useSelector(() => singlePlayerState.get());
  //const {marker} = useMarker({map});
  //useSinglePlayer(marker, singlePlayer, map);

  const back = async () => {
    await router.push("/");
  };

  trpc.singleplayer.subscribe.useSubscription(
    {
      id: String(id),
    },
    {
      onData(game: SinglePlayerGame) {
        singlePlayerState.set(game);
      },
    }
  );

  return (
    <Map onMapHandle={setMap}>
      <Overlay visible={singlePlayer.roundState === "PREPARED"}>
        <div className={"z-20 absolute left-4 top-4"}>
          <IconButton
            variant={"negative"}
            full={true}
            size={"sm"}
            onClick={back}
          >
            Abbrechen
          </IconButton>
        </div>
        <LoadingSpinner isLoading={!singlePlayer.id} />
        <SinglePlayerControlBar singlePlayer={singlePlayer} />
        <UserExperience />
        <TriesPanel />
        <FactsPanel />
      </Overlay>
    </Map>
  );
}

const namespaces = ["common", "experience", "menu"];
export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
        (await import(`../../../public/locales/${locale ?? "en"}.json`))
          .default,
        namespaces
      ),
    },
  };
};
