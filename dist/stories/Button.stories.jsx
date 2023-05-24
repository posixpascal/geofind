"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const IconButton_1 = require("@/components/controls/IconButton");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/IconButton",
    component: IconButton_1.IconButton,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
exports.Default = {
    name: "Default",
    args: {
        children: <span>Basic Text</span>,
    },
};
