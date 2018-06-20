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
RUN yarn build
RUN yarn export

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM nginx:1.13-alpine

RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/packages/manager-interface/export /usr/share/nginx/html
