"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithTag = exports.NonInteractive = exports.Interactive = void 0;
const Tile_1 = require("@/components/layout/Tile");
const Tag_1 = require("@/components/utils/Tag");
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "UI/Tile",
    component: Tile_1.Tile,
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
    argTypes: {
        tag: {
            options: ["Singleplayer", "Multiplayer", "Profile"],
            mapping: {
                Singleplayer: <Tag_1.Tag variant={"orange"} title={"Singleplayer"}/>,
                Multiplayer: <Tag_1.Tag variant={"blue"} title={"Multiplayer"}/>,
                Profile: <Tag_1.Tag variant={"green"} title={"Profile"}/>,
            },
        },
    },
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
exports.Interactive = {
    name: "Interactive",
    args: {
        title: "I'm a tile",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        interactive: true,
        icon: "💎",
    },
};
exports.NonInteractive = {
    name: "Non-Interactive",
    args: {
        title: "I'm a tile",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        interactive: false,
        icon: "",
    },
};
exports.WithTag = {
    name: "With Tag",
    args: {
        title: "I'm a tile",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        interactive: false,
        tag: <Tag_1.Tag variant={"orange"} title={"Custom Tag!"}/>,
        icon: "",
    },
};
