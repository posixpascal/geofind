"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const LevelUp_1 = require("@/components/achievements/LevelUp");
const MockedTrpcProvider_1 = require("@/stories/mocks/MockedTrpcProvider");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/LevelUp",
    component: LevelUp_1.LevelUp,
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
    name: "Default",
    args: {
        experience: 100,
        height: 600,
        width: 600,
        visible: false,
    },
};
