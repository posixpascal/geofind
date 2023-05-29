import { LocaleName } from "../../../../types";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { multiPlayerState } from "@/state/multiplayer";
import { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { PlayerLobby } from "@/components/game-lobby/PlayerLobby";
import { useSelector } from "@legendapp/state/react";
import { pick } from "next/dist/lib/pick";
import { MultiPlayerLayout } from "@/components/games/MultiPlayerLayout";
import { Layout } from "@/components/layout/Layout";

export default function MultiplayerLobbyPage() {
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

  if (!multiPlayer) {
    return <></>;
  }

  return (
    <div>
      <LoadingSpinner isLoading={loading} />
      <PlayerLobby />;
    </div>
  );
}

//MultiplayerPage.getLayout = (page) => <>{page}</>

const namespaces = ["common", "settings", "menu"];

export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
        (await import(`../../../../public/locales/${locale ?? "en"}.json`))
          .default,
        namespaces
      ),
    },
  };
};
