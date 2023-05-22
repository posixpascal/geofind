import {LocaleName} from "../../../types";
import {useRouter} from "next/router";
import {trpc} from "@/utils/trpc";
import {GameState} from "@prisma/client";
import {multiPlayerState} from "@/state/multiplayer";
import {useMemo, useState} from "react";
import {LoadingSpinner} from "@/components/utils/LoadingSpinner";
import {MultiPlayerLobby} from "@/components/games/multiplayer/MultiPlayerLobby";
import {useSelector} from "@legendapp/state/react";
import {pick} from "next/dist/lib/pick";

export default function MultiplayerPage() {
  const multiPlayer = useSelector(() => multiPlayerState.get());
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  trpc.multiplayer.subscribe.useSubscription(
    {
      id: String(id),
    },
    {
      onStarted() {
        setLoading(false);
      },
      onData(game: any) { // TODO: type
        multiPlayerState.set(game);
      },
    }
  );

  const view = useMemo(() => {
    if (!multiPlayer) {
      return <></>;
    }

    if (multiPlayer.gameState === GameState.LOBBY) {
      return <MultiPlayerLobby />;
    }

    // if (multiPlayer.gameState === GameState.PLAYING) {
    //   return <MultiPlayerGame />;
    // }

    return <>Unsupported State: {multiPlayer.gameState}</>;
  }, [multiPlayer?.gameState]);

  return (
    <div>
      <LoadingSpinner isLoading={loading} />
      {view}
    </div>
  );
}

const namespaces = [  "common",
  "settings",
  "multiplayer",
  "menu"];

export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
          (await import(`../../../public/locales/${locale}.json`)).default,
          namespaces
      )
    },
  };
};
