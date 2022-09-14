import {
  OffTableState,
  StateType,
  CardinalDirection,
  Coordinates,
  XYNorth,
  XYSouth,
  XYEast,
  XYWest,
} from "./types/index.js";

export const xYNorth: XYNorth = [0, 1];
export const xYSouth: XYSouth = [0, -1];
export const xYEast: XYEast = [1, 0];
export const xYWest: XYWest = [-1, 0];

export const cardinalToXYDirection: {
  readonly [CardinalDirection.North]: Readonly<XYNorth>;
  readonly [CardinalDirection.South]: Readonly<XYSouth>;
  readonly [CardinalDirection.East]: Readonly<XYEast>;
  readonly [CardinalDirection.West]: Readonly<XYWest>;
} = {
  [CardinalDirection.North]: xYNorth,
  [CardinalDirection.South]: xYSouth,
  [CardinalDirection.East]: xYEast,
  [CardinalDirection.West]: xYWest,
} as const;

export const defaultTableBoundary: Readonly<Coordinates> = [5, 5] as const;

export const initialRobotState: OffTableState = {
  type: StateType.OffTable,
  position: null,
  direction: null,
} as const;
