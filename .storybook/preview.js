/** @type { import('@storybook/react').Preview } */
import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
