import elementData from "./element-data.json";

export const elements = {};

for (const element of elementData) {
  Object.freeze(element);
  Object.freeze(element.OxidationStates);
  elements[element.AtomicNumber] = element;
  elements[element.Symbol] = element;
  elements[element.Name] = element;
}

Object.freeze(elements);
