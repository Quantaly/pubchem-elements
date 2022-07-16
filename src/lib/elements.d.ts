import type {
  AtomicNumber,
  AtomicSymbol,
  AtomicName,
  StandardState,
  GroupBlock,
} from "./element-data";

export declare type PubChemElementIdentifier =
  | AtomicNumber
  | AtomicSymbol
  | AtomicName;

export declare type PubChemElement = {
  readonly AtomicNumber: AtomicNumber;
  readonly Symbol: AtomicSymbol;
  readonly Name: AtomicName;

  readonly AtomicMass: number;
  readonly CPKHexColor: string | null;
  readonly ElectronConfiguration: string;
  readonly Electronegativity: number | null;
  readonly AtomicRadius: number | null;
  readonly IonizationEnergy: number | null;
  readonly ElectronAffinity: number | null;
  readonly OxidationStates: readonly number[];
  readonly StandardState: StandardState;
  readonly MeltingPoint: number | null;
  readonly BoilingPoint: number | null;
  readonly Density: number | null;
  readonly GroupBlock: GroupBlock;
  readonly YearDiscovered: number | "Ancient";
};

export declare type PubChemElements = Readonly<
  Record<PubChemElementIdentifier, PubChemElement>
>;

export declare const elements: PubChemElements;
