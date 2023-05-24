import { createTRPCMsw } from "msw-trpc";
import type { AppRouter } from "@/server/routers/_app";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

export const trpcMsw = createTRPCMsw<AppRouter>({
  transformer: {
    input: superjson,
    output: superjson,
  },
});

export const trpcReact = createTRPCReact<AppRouter>({});
