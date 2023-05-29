import { Dialog } from "@/components/ui/Dialog";
import { useSelector } from "@legendapp/state/react";
import { multiPlayerState } from "@/state/multiplayer";
import { Headline } from "@/components/ui/Headline";
import { UserAvatar } from "@/components/user/UserAvatar";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";

export const PlayerSynchronization = () => {
  const multiPlayer = useSelector(() => multiPlayerState.get());

  if (!multiPlayer) {
    return <></>;
  }
  const sessions = multiPlayer.sessions!.filter(
    (session) => session.state === "CONNECTED"
  );
  return (
    <div className={"absolute top-0 left-0"}>
      <Dialog setOpen={() => {}} open={!multiPlayer.synchronized}>
        <Headline size={"h3"}>Warte auf Spieler...</Headline>
        {sessions.map((session) => (
          <div key={session.id}>
            <div
              className={`flex col-span-1 will-change-transform items-center rounded-xl p-1 gap-4`}
              key={session.id}
            >
              <UserAvatar width={48} height={48} user={session.user} />
              <div className={"flex-grow flex"}>
                <h3 className={"text-lg font-bold"}>{session.user.name}</h3>
              </div>
              <div
                className={"relative flex items-center justify-end text-right"}
              >
                <LoadingSpinner
                  inline={true}
                  isLoading={!session.isSynchronized}
                />
                {session.isSynchronized && "✅"}
              </div>
            </div>
          </div>
        ))}
      </Dialog>
    </div>
  );
};
