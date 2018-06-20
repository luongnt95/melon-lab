FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/melon.js

COPY --from=dependencies /app/packages/melon.js/node_modules /app/packages/melon.js/node_modules

# Put the container into a 1-year long slumber.
CMD exec /bin/sh -c "trap : TERM INT; sleep 365d & wait"
