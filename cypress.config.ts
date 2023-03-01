import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://127.0.0.1:3000',
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            return config;
        },
    },
    env: {
        codeCoverage: {
            url: 'http://localhost:3000/api/coverage',
        },
    },
});
