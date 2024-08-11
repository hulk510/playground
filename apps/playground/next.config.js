const { withKumaUI } = require('@kuma-ui/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      {
        protocol: 'https',
        hostname: 'rxb7a9nggk0nv8c4.public.blob.vercel-storage.com',
      },
    ],
  },
};

module.exports = withKumaUI(nextConfig);
