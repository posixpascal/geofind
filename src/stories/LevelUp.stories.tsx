import type {Meta, StoryObj} from '@storybook/react';
import {LevelUp} from "@/components/LevelUp";
import {MockedTrpcProvider} from "@/stories/mocks/MockedTrpcProvider";
import {trpcMsw} from "@/server/trpcMock";




// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LevelUp> = {
    title: 'UI/LevelUp',
    component: LevelUp,
    decorators: [
        MockedTrpcProvider
    ],
    tags: ['autodocs'],
    parameters: {
        controls: {},
        layout: 'centered'
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LevelUp>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    parameters: {},
    name: "Default",
    args: {
       experience: 100,
       height: 600,
       width: 600,
       visible: false
    },
};

