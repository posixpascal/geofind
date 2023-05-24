"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const ProgressBar_1 = require("@/components/controls/ProgressBar");
const MockedTrpcProvider_1 = require("@/stories/mocks/MockedTrpcProvider");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/ProgressBar",
    component: ProgressBar_1.ProgressBar,
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
        current: 10,
        start: 0,
        total: 100,
    },
};
