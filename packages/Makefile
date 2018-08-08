SUBDIRS=exchange-aggregator graphql-schema graphql-server manager-components manager-interface melon.js

all: $(SUBDIRS)
test: $(SUBDIRS)
lint: $(SUBDIRS)
build: $(SUBDIRS)
tag: $(SUBDIRS)
push: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ $(MAKECMDGOALS)

.PHONY: all build lint test tag push $(SUBDIRS)
