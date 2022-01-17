FROM node:latest
WORKDIR /app
ADD package.json .
RUN yarn global add nuxt
RUN yarn install

CMD ["yarn", "dev"]
