// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./app/**/*.tsx'],
  presets: [sharedConfig],
  theme: {
    extend: {
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
    },
  },
};

export default config;
