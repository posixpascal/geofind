import type { Meta, StoryObj } from "@storybook/react";
import { Tile } from "@/components/ui/Tile";
import { Tag } from "@/components/utils/Tag";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tile> = {
  title: "UI/Tile",
  component: Tile,
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
        Singleplayer: <Tag variant={"orange"} title={"Singleplayer"} />,
        Multiplayer: <Tag variant={"blue"} title={"Multiplayer"} />,
        Profile: <Tag variant={"green"} title={"Profile"} />,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Interactive: Story = {
  name: "Interactive",
  args: {
    title: "I'm a tile",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    interactive: true,
    icon: "💎",
  },
};

export const NonInteractive: Story = {
  name: "Non-Interactive",
  args: {
    title: "I'm a tile",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    interactive: false,
    icon: "",
  },
};

export const WithTag: Story = {
  name: "With Tag",
  args: {
    title: "I'm a tile",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    interactive: false,
    tag: <Tag variant={"orange"} title={"Custom Tag!"} />,
    icon: "",
  },
};
