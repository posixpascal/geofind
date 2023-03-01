/** @type {import('next').NextConfig} */
require("./src/server/env.ts");
const {i18n} = require("./next-i18next.config.js");

const nextConfig = {
  i18n,
  experimental: {
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**',
      },
    ],
  },

  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    WS_URL: process.env.WS_URL,
  },

  webpack(config){
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
}

module.exports = nextConfig
