"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Navbar_1 = require("@/components/layout/Navbar");
const MockedTrpcProvider_1 = require("@/stories/mocks/MockedTrpcProvider");
const trpcMock_1 = require("@/server/trpcMock");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/Navbar",
    component: Navbar_1.Navbar,
    tags: ["autodocs"],
    decorators: [MockedTrpcProvider_1.MockedTrpcProvider],
    parameters: {
        backgrounds: {
            default: "beige",
            values: [
                {
                    name: "beige",
                    value: "var(--color-background)",
                },
            ],
        },
        layout: "centered",
    },
    argTypes: {},
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
exports.Default = {
    name: "Navbar Default",
    parameters: {
        msw: [
            trpcMock_1.trpcMsw.session.user.query((req, res, ctx) => {
                return res(ctx.status(200), ctx.data({
                    isLoggedIn: true,
                    name: "Logged In User 2000000000",
                }));
            }),
        ],
    },
    args: {},
};
