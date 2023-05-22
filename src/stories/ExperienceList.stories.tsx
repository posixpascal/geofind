import type {Meta, StoryObj} from "@storybook/react";
import {ExperienceList} from "@/components/achievements/ExperienceList";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ExperienceList> = {
  title: "UI/ExperienceList",
  component: ExperienceList,
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
type Story = StoryObj<typeof ExperienceList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  name: "Experience List",
  args: {},
};
