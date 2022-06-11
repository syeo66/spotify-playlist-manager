help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."
	@echo "make test      Run tests."

SRCFILES=$(shell find src -type f)

build: node_modules $(SRCFILES)
	pnpm build
	touch build

start: node_modules
	pnpm start

clean: node_modules
	rm -rf build

distclean: clean
	rm -rf node_modules

test: node_modules
	pnpm test

######################################################################

node_modules : pnpm-lock.yaml package.json
	pnpm install --config.auto-install-peers=true
	touch node_modules
