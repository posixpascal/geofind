"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedTrpcProvider = void 0;
const superjson_1 = __importDefault(require("superjson"));
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const client_1 = require("@trpc/client");
const trpcMock_1 = require("@/server/trpcMock");
const MockedTrpcProvider = (Story) => {
    const [queryClient] = (0, react_1.useState)(new react_query_1.QueryClient());
    const [trpcClient] = (0, react_1.useState)(() => trpcMock_1.trpcReact.createClient({
        links: [
            (0, client_1.httpLink)({
                url: "http://localhost:4000/trpc",
            }),
        ],
        transformer: superjson_1.default,
    }));
    return (<trpcMock_1.trpcReact.Provider client={trpcClient} queryClient={queryClient}>
        <react_query_1.QueryClientProvider client={queryClient}>
          <Story />
        </react_query_1.QueryClientProvider>
      </trpcMock_1.trpcReact.Provider>);
};
exports.MockedTrpcProvider = MockedTrpcProvider;
