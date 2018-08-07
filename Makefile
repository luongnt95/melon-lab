SUBDIRS=packages

.PHONY: all
all: bootstrap $(SUBDIRS)

# -----------------------------------------------------------------------------
# SETUP
# -----------------------------------------------------------------------------
.PHONY: network
network:
	@docker network create melonproject > /dev/null 2> /dev/null || true

.PHONY: setup
setup:
	@docker build --file Dockerfile.installer --target npm-dependencies --tag melonproject/npm-dependencies .
	@docker build --file Dockerfile.installer --target node-development --tag melonproject/node-development .
	@docker build --file Dockerfile.installer --target node-production --tag melonproject/node-production .

.PHONY: bootstrap
bootstrap: network setup

# -----------------------------------------------------------------------------
# BUILD
# -----------------------------------------------------------------------------
test: $(SUBDIRS)
lint: $(SUBDIRS)
build: $(SUBDIRS)
tag: $(SUBDIRS)
push: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ $(MAKECMDGOALS)

.PHONY: build lint test push $(SUBDIRS)

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

.PHONY: clean
clean: stop
	@docker-compose down --remove-orphans --volume
