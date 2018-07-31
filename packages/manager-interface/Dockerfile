FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/manager-interface

COPY --from=dependencies /app/packages/manager-interface/node_modules /app/packages/manager-interface/node_modules

CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as build

COPY . /app
RUN yarn build:web

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM melonproject/node-production:latest as production
WORKDIR /app/packages/manager-interface

COPY --from=dependencies /app/packages/manager-interface/node_modules /app/packages/manager-interface/node_modules
COPY --from=build /app/packages/manager-interface/build /app/packages/manager-interface/build

COPY packages/manager-interface/package.json packages/manager-interface/.env.defaults /app/packages/manager-interface/
COPY packages/manager-interface/next.config.dist.js /app/packages/manager-interface/next.config.js
COPY packages/manager-interface/config /app/packages/manager-interface/config
COPY packages/manager-interface/src/static /app/packages/manager-interface/src/static

CMD ["yarn", "start"]
