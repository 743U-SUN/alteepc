/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    dir: './logs',
    level: 'info',
  },
};

module.exports = nextConfig;
