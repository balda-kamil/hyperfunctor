/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  rules: {
    "@next/next/no-img-element": "off",
  },
};

module.exports = nextConfig;
