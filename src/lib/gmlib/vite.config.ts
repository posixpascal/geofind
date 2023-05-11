import { resolve } from 'path'
import { defineConfig } from 'vite'
import * as path from "path";

export default defineConfig({
    resolve: {
      alias: {
          '@gmf/exceptions': path.resolve(__dirname, './src/exceptions'),
          '@gmf/core': path.resolve(__dirname, './src/core'),
          '@gmf/ui': path.resolve(__dirname, './src/ui'),
          '@gmf/renderer': path.resolve(__dirname, './src/renderer')
      }
    },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'lib/index.js'),
            name: 'gmlib',
            // the proper extensions will be added
            fileName: 'gmlib',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
            },
        },
    },
})
