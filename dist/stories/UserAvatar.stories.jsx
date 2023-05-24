"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedInUser = exports.Default = void 0;
const UserAvatar_1 = require("@/components/user/UserAvatar");
const MockedTrpcProvider_1 = require("@/stories/mocks/MockedTrpcProvider");
const trpcMock_1 = require("@/server/trpcMock");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/UserAvatar",
    component: UserAvatar_1.UserAvatar,
    decorators: [MockedTrpcProvider_1.MockedTrpcProvider],
    tags: ["autodocs"],
    parameters: {
        controls: {},
        layout: "centered",
    },
    argTypes: {},
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
exports.Default = {
    parameters: {},
    name: "Guest User",
    args: {
        user: {
            id: "",
            name: "Guest User",
        },
        height: 96,
        width: 96,
    },
};
exports.LoggedInUser = {
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
    args: {
        height: 96,
        width: 96,
    },
};
