/** @type { import('@storybook/react').Preview } */
import "../app/globals.css";
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      options: {
        storySort: {
          order: ["Pages", "Components"],
        },
      },
    },
  },
};

export default preview;
