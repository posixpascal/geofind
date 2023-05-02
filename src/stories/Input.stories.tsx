import type { Meta, StoryObj } from '@storybook/react';
import {Tile} from "@/components/Tile";
import {Tag} from "@/components/Tag";
import {Input} from "@/components/Input";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: /name/g
    },
    layout: 'centered'
  },
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  name: "Default",
  args: {
    label: "Enter your e-mail address",
    type: "email",
    name: "email"
  },
};

