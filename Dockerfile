# Install dependencies only when needed
FROM node:lts-alpine AS deps

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN pnpm install --shamefully-hoist

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:lts-alpine AS builder

ENV NODE_ENV=production
WORKDIR /opt/app
RUN npm install -g pnpm
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN pnpm run build

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner

WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]
