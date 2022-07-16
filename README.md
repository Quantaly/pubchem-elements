# pubchem-elements

An ES6 module built of the periodic table data from [PubChem](https://pubchem.ncbi.nlm.nih.gov/) with a convenient interface and bundled TypeScript declarations.

## Installation

Install using your package manager of choice. With `npm`:

```sh
npm install pubchem-elements
```

Because the package is bundled as an ES6 module, if you are targeting the browser and not already using a bundler, you can download a copy into your codebase, or `import` it from a CDN:

```js
// make sure to use <script type="module">
import { elements } from "https://cdnjs.cloudflare.com/ajax/libs/pubchem-elements/1.0.0/dist/elements.js";
```

A CDN is convenient for simple uses, but you will not be able to benefit from the package's type declarations.

## Usage

Import the `elements` object, then access elements by atomic number, symbol, or name.

```js
import { elements } from "pubchem-elements";

console.log(elements[1].Name); // Hydrogen
console.log(elements.F.Electronegativity); // 3.98
console.log(elements.Iron.OxidationStates); // [3, 2]
```

The names of elements and properties are unchanged from the PubChem data, including capitalization. Some property values are converted to more convenient representations:

- Numeric values are parsed as numbers.
- Empty values are replaced with `null`.
- `OxidationStates` is parsed into a (potentially empty) array of numbers.

## Building

Building requires GNU Make. Install dependencies, then run `make` from the repository root.

If `PubChemElements_all.json` is missing, the Makefile can download it using `curl`. However, the data file is checked into the repository to keep versions associated with the data they are built from, so you should not need to download it separately.

To delete the build outputs:

```sh
make clean     # deletes the build and dist directories
make clean-all # also deletes the data file (not recommended)
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Citations

National Center for Biotechnology Information (2022). PubChem Periodic Table of Elements. Retrieved July 16, 2022 from https://pubchem.ncbi.nlm.nih.gov/periodic-table/.

## Disclaimer

This project is not in any way associated with PubChem or the National Library of Medicine. PubChem is a registered trademark of the National Library of Medicine.

## License

This is free and unencumbered software released into the public domain. See the [Unlicense](https://unlicense.org/) for full details.
