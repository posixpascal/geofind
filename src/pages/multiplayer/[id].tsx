import { LocaleName } from "../../../types";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { multiPlayerState } from "@/state/multiplayer";
import { useMemo, useState } from "react";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { MultiPlayerLobby } from "@/components/games/multiplayer/MultiPlayerLobby";
import { useSelector } from "@legendapp/state/react";
import { pick } from "next/dist/lib/pick";
import { MultiPlayerGame } from "@/components/games/multiplayer/MultiPlayerGame";
import {Layout} from "@/components/layout/Layout";

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
      onData(game: any) {
        // TODO: type
        multiPlayerState.set(game);
      },
    }
  );

  const view = useMemo(() => {
    if (!multiPlayer) {
      return <></>;
    }

    if (multiPlayer.gameState === "LOBBY") {
      return <Layout><MultiPlayerLobby /></Layout>;
    }

    if (multiPlayer.gameState === "PLAYING") {
      return <MultiPlayerGame />;
    }

    return <>Unsupported State: {multiPlayer.gameState}</>;
  }, [multiPlayer?.gameState]);

  return (
    <div>
      <LoadingSpinner isLoading={loading} />
      {view}
    </div>
  );
}

MultiplayerPage.getLayout = ({children}) => <>{children}</>

const namespaces = ["common", "settings", "menu"];

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
