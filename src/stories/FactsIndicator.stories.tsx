import type { Meta, StoryObj } from "@storybook/react";
import { FactsPanel } from "@/components/maps/FactsPanel";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FactsPanel> = {
  title: "UI/FactsIndicator",
  component: FactsPanel,
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

export default meta;
type Story = StoryObj<typeof FactsPanel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  name: "Experience List",
  args: {},
};
