.PHONY: coverage
coverage:
	env CYPRESS_COVERAGE=true pnpm run build
	env CYPRESS_COVERAGE=true nyc --require ts-node/register node ./.output/server/index.mjs
	env CYPRESS_COVERAGE=true cypress run

