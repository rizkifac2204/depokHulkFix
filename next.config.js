/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST: process.env.HOST,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};

module.exports = nextConfig;
