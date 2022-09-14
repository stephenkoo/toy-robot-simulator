import { xYNorth, xYSouth, xYEast, xYWest } from "../../constants.js";
import { CardinalDirection } from "../../types/index.js";
import { getCardinalDirection } from "../get-direction.js";

test.each([
  { cardinalDirection: CardinalDirection.North, xYDirection: xYNorth },
  { cardinalDirection: CardinalDirection.South, xYDirection: xYSouth },
  { cardinalDirection: CardinalDirection.East, xYDirection: xYEast },
  { cardinalDirection: CardinalDirection.West, xYDirection: xYWest },
])(
  "returns $cardinalDirection from XY direction $xYDirection",
  ({ cardinalDirection, xYDirection }) => {
    expect(getCardinalDirection(xYDirection)).toEqual(cardinalDirection);
  }
);
