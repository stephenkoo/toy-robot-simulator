import { RobotContext, OnTableState } from "../types/index.js";
import { getForwardCoordinates } from "../utils/get-forward-coordinates.js";
import { isOutsideTable } from "../utils/is-outside-table.js";
import { getRobotCardinalDirection } from "./utils/get-robot-direction.js";

export const handleMoveForward = (
  context: RobotContext<OnTableState>
): RobotContext<OnTableState> => {
  const { robot, log } = context;
  const newCoordinates = getForwardCoordinates(robot.position, robot.direction);

  if (isOutsideTable(newCoordinates, context.table)) {
    log.warn(
      `🚧 Robot can't move forward - it'll fall of the table of size ${context.table.join(
        ","
      )}`
    );
    return context;
  }

  const direction = getRobotCardinalDirection(robot.direction);

  log.info(
    `💨 Robot moved forward to 📍${newCoordinates.join(",")}${
      direction ? `, facing 🧭${direction}` : ""
    }`
  );

  return {
    ...context,
    robot: {
      ...robot,
      position: newCoordinates,
    },
  };
};
