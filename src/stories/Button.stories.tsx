import type { Meta, StoryObj } from '@storybook/react';
import {Tile} from "@/components/Tile";
import {Tag} from "@/components/Tag";
import {IconButton} from "@/components/IconButton";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  name: "Default",
  args: {
    children: <span>Basic Text</span>
  },
};

