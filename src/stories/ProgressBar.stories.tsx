import type {Meta, StoryObj} from "@storybook/react";
import {ProgressBar} from "@/components/controls/ProgressBar";
import {MockedTrpcProvider} from "@/stories/mocks/MockedTrpcProvider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  decorators: [MockedTrpcProvider],
  tags: ["autodocs"],
  parameters: {
    controls: {},
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  parameters: {},
  name: "Default",
  args: {
    current: 10,
    start: 0,
    total: 100,
  },
};
