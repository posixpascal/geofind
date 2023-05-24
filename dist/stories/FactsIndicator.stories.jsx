"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const FactsIndicator_1 = require("@/components/games/panels/FactsIndicator");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/FactsIndicator",
    component: FactsIndicator_1.FactsIndicator,
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
    name: "Experience List",
    args: {},
};
