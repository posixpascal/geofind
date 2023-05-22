import type {Meta, StoryObj} from "@storybook/react";
import {Navbar} from "@/components/layout/Navbar";
import {MockedTrpcProvider} from "@/stories/mocks/MockedTrpcProvider";
import {trpcMsw} from "@/server/trpcMock";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Navbar> = {
  title: "UI/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  decorators: [MockedTrpcProvider],
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
type Story = StoryObj<typeof Navbar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  name: "Navbar Default",
  parameters: {
    msw: [
      trpcMsw.session.user.query((req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.data({
            isLoggedIn: true,
            name: "Logged In User 2000000000",
          })
        );
      }),
    ],
  },
  args: {},
};
