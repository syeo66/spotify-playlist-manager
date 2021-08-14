help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."
	@echo "make test      Run tests."

SRCFILES=$(shell find src -type f)

build: .yarn/cache $(SRCFILES)
	yarn build
	touch build

start: .yarn/cache
	yarn start

clean: .yarn/cache
	rm -rf build

distclean: clean

test: .yarn/cache
	yarn test

######################################################################

.yarn/cache : yarn.lock package.json .pnp.cjs
	yarn
	touch .yarn/cache
