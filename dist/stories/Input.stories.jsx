"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Input_1 = require("@/components/controls/Input");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/Input",
    component: Input_1.Input,
    tags: ["autodocs"],
    parameters: {
        controls: {
            exclude: /name/g,
        },
        layout: "centered",
    },
    argTypes: {},
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
exports.Default = {
    name: "Default",
    args: {
        label: "Enter your e-mail address",
        type: "email",
        name: "email",
    },
};
