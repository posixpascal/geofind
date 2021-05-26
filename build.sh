#!/bin/bash

cd packages/web/
yarn run build
yarn run generate
cd ../server/
yarn run build

cd ../../
cp -R packages/web/dist/* packages/server/public/
cp -R packages/web/dist/.* packages/server/public/

pm2 restart 0
echo "Build completed"
