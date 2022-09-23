import { xYEast, xYNorth, xYSouth, xYWest } from "../../constants.js";
import { XYDirection } from "../../types/index.js";
import { turnLeft, turnRight } from "../turn.js";

test.each<{
  direction: XYDirection;
  newDirection: XYDirection;
}>([
  { direction: xYNorth, newDirection: xYEast },
  { direction: xYEast, newDirection: xYSouth },
  { direction: xYSouth, newDirection: xYWest },
  { direction: xYWest, newDirection: xYNorth },
])(
  "turns right from XY direction $direction to $newDirection",
  ({ direction, newDirection }) => {
    expect(turnRight(direction)).toEqual(newDirection);
  }
);

test.each<{
  direction: XYDirection;
  newDirection: XYDirection;
}>([
  { direction: xYNorth, newDirection: xYWest },
  { direction: xYWest, newDirection: xYSouth },
  { direction: xYSouth, newDirection: xYEast },
  { direction: xYEast, newDirection: xYNorth },
])(
  "turns left from XY direction $direction to $newDirection",
  ({ direction, newDirection }) => {
    expect(turnLeft(direction)).toEqual(newDirection);
  }
);
