help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."
	@echo "make test      Run tests."

SRCFILES=$(shell find src -type f)

build: node_modules $(SRCFILES)
	yarn build
	touch build

start: node_modules
	yarn start

clean: node_modules
	rm -rf build

distclean: clean
	rm -rf node_modules

deploy: node_modules
	git switch main && git push all && git push
	git switch stage && git pull && git merge main && git push all && git push
	git switch main

test: node_modules
	yarn test

######################################################################

node_modules : yarn.lock package.json
	yarn install
	touch node_modules
