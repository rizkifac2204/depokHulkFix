const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST: process.env.HOST,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  reactStrictMode: true,
  // compiler: {
  //   // ssr and displayName are configured by default
  //   styledComponents: true,
  // },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },
};

module.exports = nextConfig;
