import type { Meta, StoryObj } from '@storybook/react';
import {Tile} from "@/components/Tile";
import {Tag} from "@/components/Tag";
import {LoadingSpinner} from "@/components/LoadingSpinner";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [
        {
          name: 'beige',
          value: "var(--color-background)"
        }
      ],
    },
    layout: 'centered'
  },
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  name: "Default",
  args: {
   isLoading: true
  },
};
