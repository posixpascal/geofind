"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Map_1 = require("@/components/layout/Map");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/Map",
    component: Map_1.Map,
    tags: ["autodocs"],
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
    name: "Default",
    args: {
        onMapHandle() { },
        onMapInstance() { },
    },
};
