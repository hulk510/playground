const { withKumaUI } = require('@kuma-ui/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  images: {
    domains: ['localhost'],
  },
};

module.exports = withKumaUI(nextConfig);
