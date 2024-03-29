const { withKumaUI } = require('@kuma-ui/next-plugin');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
};

module.exports = withKumaUI(withNextra(nextConfig));
