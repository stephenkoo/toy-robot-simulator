import { handleReport } from "./transitions/index.js";
import {
  isOffTableContext,
  isOnTableContext,
  RobotContext,
  EventType,
  RobotEvent,
  OffTableState,
  OnTableState,
} from "./types/index.js";

const reduceOffTable = (
  context: RobotContext<OffTableState>,
  event: RobotEvent
) => {
  switch (event.type) {
    case EventType.Report:
      return handleReport(context);
    default:
      return context;
  }
};

const reduceOnTable = (
  context: RobotContext<OnTableState>,
  event: RobotEvent
) => {
  switch (event.type) {
    case EventType.Report:
      return handleReport(context);
    default:
      return context;
  }
};

export const reducer = (
  context: RobotContext,
  event: RobotEvent
): RobotContext => {
  if (isOnTableContext(context)) {
    return reduceOnTable(context, event);
  }
  if (isOffTableContext(context)) {
    return reduceOffTable(context, event);
  }
  return context;
};

