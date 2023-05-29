import { trpc } from "@/utils/trpc";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { PageHeader } from "@/components/layout/PageHeader";
import { MultiPlayerGame, User } from "@prisma/client";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";

type OpenGame = MultiPlayerGame & {
  creator: Pick<User, "name">;
  sessions: {
    _count: number;
  };
};

export default function MultiPlayerJoinPage() {
  const { data, isLoading }: { data: OpenGame[]; isLoading: boolean } =
    trpc.multiplayer.findOpenGames.useQuery();
  return (
    <div>
      <LoadingSpinner isLoading={isLoading} />

      {data && (
        <div>
          <div className={"grid grid-cols-5 gap-8"}>
            <div className={"col-span-3"}>
              <PageHeader
                title={"Offene Spiele"}
                description={
                  "Hier findest Du offene Spiele denen du einfach beitreten kannst"
                }
              />
              <div className="grid grid-cols-3 gap-4">
                {data.map((game, index) => (
                  <Box
                    title={game.roomCode}
                    description={`Ein Spiel von ${game.creator.name}`}
                    key={game.id}
                    delay={300 * index}
                  >
                    <div className={""}>Test</div>
                    {game.creator.name} {game.sessions._count}
                  </Box>
                ))}
              </div>
            </div>
            <div className={"col-span-2"}>
              <Box
                title={"Quick Connect"}
                description={
                  "Gebe hier einen Raum Code ein um direkt am Spiel teilzunehmen."
                }
              >
                <Input label={"Raum Code"} name={"roomcode"} type={"text"} />
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
