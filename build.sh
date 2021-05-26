#!/bin/bash

cd packages/web/
yarn run build
yarn run generate
cd ../server/
yarn run build

cd ../../
rm -r packages/server/public/*
cp -R packages/web/dist/* packages/server/public/

sudo pm2 restart 0
echo "Build completed"
