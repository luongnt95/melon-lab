FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/faucet

COPY --from=dependencies /app/packages/faucet/node_modules /app/packages/faucet/node_modules

CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as build

COPY . /app
RUN yarn build

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM melonproject/node-production:latest as production
WORKDIR /app/packages/faucet

COPY --from=dependencies /app/packages/faucet/node_modules /app/packages/faucet/node_modules
COPY --from=build /app/packages/faucet/dist /app/packages/faucet/dist
COPY packages/faucet/package.json packages/faucet/.env.defaults packages/faucet/next.config.js /app/packages/faucet/
COPY packages/faucet/config /app/packages/faucet/config
COPY packages/faucet/src/static /app/packages/faucet/src/static

CMD ["yarn", "start"]
