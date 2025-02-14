import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import remarkCollapse from 'remark-collapse'
import remarkToc from 'remark-toc'
import { SITE } from './src/config'

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    expressiveCode({
      themes: ['ayu-dark', 'monokai'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => {
        return `[data-theme="${theme.name === 'ayu-dark' ? 'dark' : 'light'}"]`
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: 'Table of contents',
        },
      ],
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  scopedStyleStrategy: 'where',
})
