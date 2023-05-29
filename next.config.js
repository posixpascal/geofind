/** @type {import('next').NextConfig} */
require("./src/server/env.ts");


let nextConfig = {
    // compiler: {
    //     reactRemoveProperties: true,
    //     removeConsole: true,
    // },
    i18n: {
        defaultLocale: 'de',
        locales: ['en', 'de'],
    },
    experimental: {},

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

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },

    modularizeImports: {},
}

const shouldAnalyzeBundles = false;
if (shouldAnalyzeBundles) {
    const withNextBundleAnalyzer =
              require('next-bundle-analyzer')(/* options come there */);
    nextConfig                   = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig
