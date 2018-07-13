FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/ranking

COPY --from=dependencies /app/packages/ranking/node_modules /app/packages/ranking/node_modules

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
WORKDIR /app/packages/ranking

COPY --from=build /app/packages/ranking/dist /app/packages/ranking/dist
COPY --from=dependencies /app/packages/ranking/node_modules /app/packages/ranking/node_modules
COPY packages/ranking/package.json packages/ranking/.env.defaults /app/packages/ranking/

CMD ["yarn", "start"]
