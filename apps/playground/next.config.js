/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost', port: '3000' }],
  },
}

module.exports = nextConfig
