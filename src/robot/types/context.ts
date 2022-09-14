import { LogContext } from "../../types.js";
import { Coordinates } from "./space.js";
import {
  OffTableState,
  OnTableState,
  RobotState,
  StateType,
} from "./states.js";

export type RobotContext<T extends RobotState = RobotState> = LogContext & {
  robot: T;
  table: Coordinates;
};

export const isOnTableContext = (
  context: RobotContext
): context is RobotContext<OnTableState> =>
  context.robot.type === StateType.OnTable;

export const isOffTableContext = (
  context: RobotContext
): context is RobotContext<OffTableState> =>
  context.robot.type === StateType.OffTable;
