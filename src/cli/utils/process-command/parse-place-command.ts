import { cardinalToXYDirection } from "../../../robot/constants.js";
import {
  EventType,
  PlaceEvent,
  CardinalDirection,
  XYDirection,
  RobotContext,
} from "../../../robot/types/index.js";

type HandlePlaceCommandArgumentReturn = (
  | {
      isValid: false;
      event: null;
    }
  | {
      isValid: true;
      event: PlaceEvent;
    }
) & {
  extraArguments: (string | undefined)[];
};

export const parsePlaceCommand = (
  robot: RobotContext,
  placeCommandArgument: string | undefined
): HandlePlaceCommandArgumentReturn => {
  if (!placeCommandArgument) {
    robot.log.error("🤔 Missing PLACE command arguments. Try PLACE 1,2,EAST");

    return { isValid: false, event: null, extraArguments: [] };
  }

  const [xCoordinate, yCoordinate, direction, ...otherPlaceArguments]: (
    | string
    | undefined
  )[] = placeCommandArgument.split(",");

  const isValidCoordinate = (text: string | undefined) =>
    !!text && !isNaN(Number(text));

  const isValidDirection = (
    direction: string | undefined
  ): direction is CardinalDirection =>
    direction ? direction in cardinalToXYDirection : false;

  const isValidPlaceArgument =
    isValidCoordinate(xCoordinate) &&
    isValidCoordinate(yCoordinate) &&
    isValidDirection(direction);

  if (!isValidPlaceArgument) {
    robot.log.error(
      `🤔 ${[xCoordinate, yCoordinate, direction]
        .filter(Boolean)
        .join(",")} isn't a valid position. Try PLACE 0,0,NORTH`
    );

    return {
      isValid: false,
      event: null,
      extraArguments: otherPlaceArguments,
    };
  }

  const xyDirection = cardinalToXYDirection[direction] as XYDirection;

  const event: PlaceEvent = {
    type: EventType.Place,
    direction: xyDirection,
    position: [Number(xCoordinate), Number(yCoordinate)],
  };

  return {
    isValid: true,
    event,
    extraArguments: otherPlaceArguments,
  };
};
