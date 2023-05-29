import { defineConfig } from "cypress";
import path from "path";
const webpack = require('@cypress/webpack-preprocessor')

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // @src alias
      const options = {
        webpackOptions: {
          resolve: {
            fallback: {
              path: require.resolve('path-browserify'),
              fs: require.resolve('browserify-fs'),
              stream: require.resolve('stream-browserify')
            },
            alias: {
              '@': path.resolve(__dirname, './src')
            },
          },
        },
        watchOptions: {},
      }

      if (process.env.COMPONENTS) {
        on('file:preprocessor', webpack(options))
      }
    },
    baseUrl: "http://localhost:3000",
  },

  env: {
    codeCoverage: {
      url: "/api/__coverage__",
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
