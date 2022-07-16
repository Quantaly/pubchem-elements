all: dist/elements.js dist/types/elements.d.ts dist/types/element-data.d.ts

clean:
	rm -Rf build dist

clean-all:
	rm -Rf build dist PubChemElements_all.json

build/element-data.json dist/types/element-data.d.ts &: PubChemElements_all.json src/build.js
	@mkdir -p build
	@mkdir -p dist/types
	node src/build.js

build/elements.js: src/lib/elements.js
	@mkdir -p build
	cp src/lib/elements.js build/elements.js

dist/elements.js: build/elements.js build/element-data.json
	@mkdir -p dist
	./node_modules/.bin/esbuild --bundle --format=esm --outfile=dist/elements.js --minify build/elements.js

dist/types/elements.d.ts: src/lib/elements.d.ts
	@mkdir -p dist/types
	cp src/lib/elements.d.ts dist/types/elements.d.ts

PubChemElements_all.json:
	curl https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON/ -o PubChemElements_all.json
