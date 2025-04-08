/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    dir: './logs',
    level: 'info',
  },
  output: 'standalone',
};

module.exports = nextConfig;
