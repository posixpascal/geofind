import type { Meta, StoryObj } from "@storybook/react";
import { LevelUpAnimation } from "@/components/utils/LevelUpAnimation";
import { MockedTrpcProvider } from "@/stories/mocks/MockedTrpcProvider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LevelUpAnimation> = {
  title: "UI/LevelUp",
  component: LevelUpAnimation,
  decorators: [MockedTrpcProvider],
  tags: ["autodocs"],
  parameters: {
    controls: {},
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LevelUpAnimation>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  parameters: {},
  name: "Default",
  args: {
    experience: 100,
    height: 600,
    width: 600,
    visible: false,
  },
};
