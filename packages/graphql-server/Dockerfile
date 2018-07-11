FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/graphql-server

COPY --from=dependencies /app/packages/graphql-server/node_modules /app/packages/graphql-server/node_modules

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
WORKDIR /app/packages/graphql-server

COPY --from=build /app/packages/graphql-server/dist /app/packages/graphql-server/dist
COPY --from=dependencies /app/packages/graphql-server/node_modules /app/packages/graphql-server/node_modules
COPY packages/graphql-server/package.json packages/graphql-server/.env.defaults /app/packages/graphql-server/

CMD ["yarn", "start"]
