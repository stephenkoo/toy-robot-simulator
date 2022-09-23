import {
  RobotContext,
  PlaceEvent,
  OnTableState,
  StateType,
} from "../types/index.js";
import { isOutsideTable } from "../utils/is-outside-table.js";
import { handleReport } from "./report.js";

export const handlePlace = (
  context: RobotContext,
  event: PlaceEvent
): RobotContext => {
  if (isOutsideTable(event.position, context.table)) {
    context.log.warn(
      `😫 Robot can't be placed outside the table boundary: ${context.table.join(
        ","
      )}`
    );
    return context;
  }

  const newRobotState: OnTableState = {
    type: StateType.OnTable,
    direction: event.direction,
    position: event.position,
  };

  return handleReport({
    ...context,
    robot: newRobotState,
  });
};
