import type { Preview } from "@storybook/react";
import '../src/styles/globals.css';

import { initialize, mswDecorator } from 'msw-storybook-addon';

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize();

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'beige',
      values: [
        {
          name: 'beige',
          value: "var(--color-background)"
        }
      ],
    },
  },
};

export default preview;
