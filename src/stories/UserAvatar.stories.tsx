import type {Meta, StoryObj} from "@storybook/react";
import {UserAvatar} from "@/components/user/UserAvatar";
import {MockedTrpcProvider} from "@/stories/mocks/MockedTrpcProvider";
import {trpcMsw} from "@/server/trpcMock";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UserAvatar> = {
  title: "UI/UserAvatar",
  component: UserAvatar,
  decorators: [MockedTrpcProvider],
  tags: ["autodocs"],
  parameters: {
    controls: {},
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  parameters: {},
  name: "Guest User",
  args: {
    user: {
      id: "",
      name: "Guest User",
    },
    height: 96,
    width: 96,
  },
};

export const LoggedInUser: Story = {
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
  args: {
    height: 96,
    width: 96,
  },
};
