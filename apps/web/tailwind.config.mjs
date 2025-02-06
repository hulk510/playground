import sharedConfig from '@repo/tailwind-config'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/design-system/src/**/*.tsx',
  ],
  theme: {
    screens: {
      sm: '640px',
    },
    extend: {
      textColor: {
        skin: {
          base: 'hsl(var(--color-text-base))',
          body: 'hsl(var(--color-text-body))',
          accent: 'hsl(var(--color-accent))',
          inverted: 'hsl(var(--color-fill))',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'hsl(var(--color-fill))',
          accent: 'hsl(var(--color-accent))',
          inverted: 'hsl(var(--color-text-base))',
          card: 'hsl(var(--color-card))',
          'card-muted': 'hsl(var(--color-card-muted))',
        },
      },
      outlineColor: {
        skin: {
          fill: 'hsl(var(--color-accent))',
        },
      },
      borderColor: {
        skin: {
          line: 'hsl(var(--color-border))',
          fill: 'hsl(var(--color-text-base))',
          accent: 'hsl(var(--color-accent))',
        },
      },
      fill: {
        skin: {
          base: 'hsl(var(--color-text-base))',
          accent: 'hsl(var(--color-accent))',
        },
        transparent: 'transparent',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },

      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  presets: [sharedConfig],
}

export default config
