/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST: process.env.HOST,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_LEVEL_START: process.env.LEVEL_START,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
