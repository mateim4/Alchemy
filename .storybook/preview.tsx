import * as React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import '../dist/css/alchemy.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#101010' },
        { name: 'light', value: '#F7F7FF' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultMode="dark">
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
