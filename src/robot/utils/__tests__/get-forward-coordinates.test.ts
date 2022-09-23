import { xYNorth, xYSouth, xYEast, xYWest } from "../../constants.js";
import { Coordinates, XYDirection } from "../../types/index.js";
import { getForwardCoordinates } from "../get-forward-coordinates";

test.each<{
  position: Coordinates;
  direction: XYDirection;
  newPosition: Coordinates;
}>([
  { position: [0, 10], direction: xYNorth, newPosition: [0, 11] },
  { position: [2, 0], direction: xYSouth, newPosition: [2, -1] },
  { position: [3, 5], direction: xYEast, newPosition: [4, 5] },
  { position: [0, 3], direction: xYWest, newPosition: [-1, 3] },
])(
  "returns new coordinates $newPosition when taking 1 step from $position when facing XY direction of $direction",
  ({ position, direction, newPosition }) => {
    expect(getForwardCoordinates(position, direction)).toEqual(newPosition);
  }
);
