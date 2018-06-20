VERSION := $(or ${TRAVIS_BUILD_ID}, LOCAL)

# -----------------------------------------------------------------------------
# SETUP
# -----------------------------------------------------------------------------
.PHONY: network
network:
	@docker network create melonproject > /dev/null 2> /dev/null || true

.PHONY: install
install:
	@docker build --file Dockerfile.installer --target npm-dependencies --tag melonproject/npm-dependencies:latest .
	@docker build --file Dockerfile.installer --target node-development --tag melonproject/node-development:latest .
	@docker build --file Dockerfile.installer --target node-production --tag melonproject/node-production:latest .

.PHONY: bootstrap
bootstrap: network install

# -----------------------------------------------------------------------------
# BUILD - COMMON
# -----------------------------------------------------------------------------
.PHONY: all
all: install build lint test

.PHONY: build
build:
	@docker-compose build

.PHONY: lint
lint:
	@docker-compose run --rm exchange-aggregator yarn lint
	@docker-compose run --rm graphql-server yarn lint
	@docker-compose run --rm graphql-schema yarn lint
	@docker-compose run --rm manager-interface yarn lint
	@docker-compose run --rm manager-components yarn lint
	@docker-compose run --rm faucet yarn lint
	# TODO: Fix tests and linting in imported projects.
	# @docker-compose run --rm melon-js yarn lint

.PHONY: test
test:
	@docker-compose run --rm exchange-aggregator yarn test
	@docker-compose run --rm graphql-server yarn test
	@docker-compose run --rm graphql-schema yarn test
	@docker-compose run --rm manager-interface yarn test
	@docker-compose run --rm manager-components yarn test
	@docker-compose run --rm faucet yarn test
	# TODO: Fix tests and linting in imported projects.
	# @docker-compose run --rm melon-js yarn test

# -----------------------------------------------------------------------------
# BUILD - CI
# -----------------------------------------------------------------------------
.PHONY: package
package:
	@docker tag melonproject/graphql-server:latest melonproject/graphql-server:${VERSION}

.PHONY: publish
publish:
	@docker push melonproject/graphql-server:${VERSION}

.PHONY: teardown
teardown:
	@docker-compose down --remove-orphans --timeout 0

# -----------------------------------------------------------------------------
# DEVELOPMENT
# -----------------------------------------------------------------------------
.PHONY: start
start:
	@docker-compose up

.PHONY: stop
stop:
	@docker-compose kill

.PHONY: restart
restart: stop start