import type {Meta, StoryObj} from '@storybook/react';
import {FactsIndicator} from "@/components/FactsIndicator";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FactsIndicator> = {
    title: 'UI/FactsIndicator',
    component: FactsIndicator,
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
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FactsIndicator>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    name: "Experience List",
    args: {

    },
};
