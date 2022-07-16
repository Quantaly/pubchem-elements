import { readFileSync, writeFileSync } from "fs";

const json = JSON.parse(readFileSync("PubChemElements_all.json"));

const columnNames = json.Table.Columns.Column;
const data = json.Table.Row.map(({ Cell }) =>
  Object.fromEntries(
    columnNames.map((key, i) => [key, mungeValue(key, Cell[i])])
  )
);

function mungeValue(key, value) {
  switch (key) {
    case "AtomicNumber":
      return Number.parseInt(value);
    case "AtomicMass":
    case "Electronegativity":
    case "AtomicRadius":
    case "IonizationEnergy":
    case "ElectronAffinity":
    case "MeltingPoint":
    case "BoilingPoint":
    case "Density":
      if (value === "") {
        return null;
      } else {
        return Number.parseFloat(value);
      }
    case "CPKHexColor":
      if (value === "") {
        return null;
      } else {
        return value;
      }
    case "OxidationStates":
      if (value === "") {
        return [];
      } else {
        return value.split(",").map((n) => Number.parseInt(n));
      }
    case "YearDiscovered":
      if (value === "Ancient") {
        return value;
      } else {
        return Number.parseInt(value);
      }
    default:
      return value;
  }
}

writeFileSync("build/element-data.json", JSON.stringify(data));

const TYPED_PROPERTIES = [
  {
    propName: "AtomicNumber",
    typeName: "AtomicNumber",
  },
  {
    propName: "Symbol",
    typeName: "AtomicSymbol",
  },
  {
    propName: "Name",
    typeName: "AtomicName",
  },
  {
    propName: "StandardState",
    typeName: "StandardState",
  },
  {
    propName: "GroupBlock",
    typeName: "GroupBlock",
  },
];
const elementDataDeclarations = TYPED_PROPERTIES.map(
  ({ propName, typeName }) => {
    const values = new Set();
    for (const element of data) {
      values.add(element[propName]);
    }
    const valueArray = [];
    for (const value of values) {
      valueArray.push(JSON.stringify(value));
    }
    return `export declare type ${typeName} = ${valueArray.join("|")};`;
  }
).join("\n");

writeFileSync("dist/types/element-data.d.ts", elementDataDeclarations);
