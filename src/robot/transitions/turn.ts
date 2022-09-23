import { RobotContext, OnTableState } from "../types/index.js";
import { turnLeft, turnRight } from "../utils/turn.js";
import { getRobotCardinalDirection } from "./utils/get-robot-direction.js";

export const handleTurnLeft = (
  context: RobotContext<OnTableState>
): RobotContext<OnTableState> => {
  const { robot, log } = context;
  const newXYDirection = turnLeft(robot.direction);
  const direction = getRobotCardinalDirection(newXYDirection);
  const directionMessage = direction ? `, now facing 🧭${direction}` : "";

  log.info(`↪️ Robot turned left${directionMessage}`);

  return {
    ...context,
    robot: {
      ...context.robot,
      direction: newXYDirection,
    },
  };
};

export const handleTurnRight = (
  context: RobotContext<OnTableState>
): RobotContext<OnTableState> => {
  const { robot, log } = context;
  const newXYDirection = turnRight(robot.direction);
  const direction = getRobotCardinalDirection(newXYDirection);
  const directionMessage = direction ? `, now facing 🧭${direction}` : "";

  log.info(`↩️ Robot turned right${directionMessage}`);

  return {
    ...context,
    robot: {
      ...context.robot,
      direction: newXYDirection,
    },
  };
};
