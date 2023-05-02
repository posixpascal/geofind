import superjson from "superjson";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import {httpLink} from "@trpc/client";
import {trpcReact} from "@/server/trpcMock";

export const MockedTrpcProvider = (Story) => {
    const [queryClient] = useState(new QueryClient())
    const [trpcClient] = useState(() =>
        trpcReact.createClient({
            links: [
                httpLink({
                    url: 'http://localhost:4000/trpc',
                }),
            ],
            transformer: superjson
        }),
    );

    return <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            <Story/>
        </QueryClientProvider>
    </trpcReact.Provider>
}