FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine as development
WORKDIR /app/packages/manager-interface

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/manager-interface/node_modules /app/packages/manager-interface/node_modules

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
FROM node:9.7.0-alpine
WORKDIR /app/packages/manager-interface

EXPOSE 3030

COPY --from=installer /app/node_modules_production /app/node_modules
COPY --from=installer /app/packages/manager-interface/node_modules ./node_modules
COPY --from=build /app/packages/manager-interface/dist ./dist
COPY --from=build /app/packages/manager-interface/src/static ./src/static
COPY packages/manager-interface/config ./config
COPY packages/manager-interface/package.json packages/manager-interface/.env.defaults ./
COPY packages/manager-interface/next.config.dist.js ./next.config.js

CMD ["yarn", "start"]
