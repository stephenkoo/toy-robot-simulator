import { cardinalToXYDirection } from "../constants.js";
import { CardinalDirection, XYDirection } from "../types/index.js";

const cardinalDirections = Object.keys(
  cardinalToXYDirection
) as CardinalDirection[];

/**
 * Converts orientation expressed as cartesian coordinates into a cardinal
 * direction for reporting purposes.
 *
 * @param direction - XYDirection as cartesian coordinates
 * @returns The cardinal direction of the orientation. Should really always
 * return a non-null cardinal direction value if orientation is in
 * cardinalToXYDirection (which it should).
 */
export const getCardinalDirection = (
  direction: XYDirection
): CardinalDirection | undefined =>
  cardinalDirections.find((cardinal) => {
    const [x, y] = cardinalToXYDirection[cardinal];
    return direction[0] === x && direction[1] === y;
  });
