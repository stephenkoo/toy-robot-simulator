import { CardinalDirection, XYDirection } from "../../types/index.js";
import { getCardinalDirection } from "../../utils/get-direction.js";

export const getRobotCardinalDirection = (
  direction: XYDirection
): CardinalDirection | undefined => {
  const cardinalDirection = getCardinalDirection(direction);

  if (!cardinalDirection) {
    console.error(
      `Unable to get direction for direction [${direction.toString()}]`
    );
  }

  return cardinalDirection;
};
