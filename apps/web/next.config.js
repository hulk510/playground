const { withKumaUI } = require('@kuma-ui/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
};

module.exports = withKumaUI(nextConfig);
