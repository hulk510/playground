import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'
import remarkCollapse from 'remark-collapse'
import remarkToc from 'remark-toc'
import { SITE } from './src/config'
import { transformerFileName } from './src/utils/transformers/fileName'

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: (page) => SITE.showArchives || !page.endsWith('/archives'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: 'Table of contents' }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: 'min-light', dark: 'night-owl' },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: 'v3' }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  image: {
    // Used for all Markdown images; not configurable per-image
    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop
    layout: 'constrained',
    responsiveStyles: true,
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: 'public',
        context: 'client',
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
  },
})
