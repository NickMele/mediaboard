.PHONY: install build full-clean clean

full-clean:
	rm -rf bower_components
	rm -rf node_modules
	rm -rf build

clean:
	rm -rf build

install: full-clean
	npm install
	./node_modules/bower/bin/bower install
	./node_modules/brunch/bin/brunch build

build: clean
	./node_modules/brunch/bin/brunch build

start:
	./node_modules/brunch/bin/brunch watch --server
