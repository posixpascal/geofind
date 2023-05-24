"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const ExperienceList_1 = require("@/components/achievements/ExperienceList");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/ExperienceList",
    component: ExperienceList_1.ExperienceList,
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
