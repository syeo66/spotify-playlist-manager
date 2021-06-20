help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."
	@echo "make test      Run tests."

build: node_modules src
	yarn build
	touch build

start: node_modules
	yarn start

clean: node_modules
	rm -rf build

distclean: clean
	rm -rf node_modules

test: node_modules
	yarn test

######################################################################

node_modules : yarn.lock package.json
	yarn
	touch node_modules
