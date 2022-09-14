import {
  RobotContext,
  isOffTableContext,
  isOnTableContext,
} from "../types/index.js";
import { getRobotCardinalDirection } from "./utils/get-robot-direction.js";

export const handleReport = (context: RobotContext): RobotContext => {
  if (isOnTableContext(context)) {
    const { robot, log } = context;

    const cardinalDirection = getRobotCardinalDirection(robot.direction);

    log.info(
      `📢 Robot is on 📍${robot.position.join(",")}${
        cardinalDirection ? `, facing 🧭${cardinalDirection}` : ""
      }`
    );
  }

  if (isOffTableContext(context)) {
    context.log.warn(
      "📢 Robot is not on the table. Place robot on table before running other commands."
    );
  }

  return context;
};
