type YCoordinate = number;
type XCoordinate = number;

export type Coordinates = [XCoordinate, YCoordinate];

export enum CardinalDirection {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
}

/**
 * XYDirection expressed as cartesian coordinates [X, Y].
 *
 * First element represents longitudinal direction relative to the East:
 * 1 represents facing East, -1 facing West, 0 neither
 *
 * Second element represents latitudinal direction relative to the North:
 * 1 represents facing North, -1 facing South, 0 neither
 */
export type XYNorth = [0, 1];
export type XYSouth = [0, -1];
export type XYEast = [1, 0];
export type XYWest = [-1, 0];

export type XYDirection = XYNorth | XYSouth | XYEast | XYWest;

export type Pose = {
  direction: XYDirection;
  position: Coordinates;
};
