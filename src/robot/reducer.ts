import {
  handleMoveForward,
  handleOffTableInvalidAction,
  handlePlace,
  handleReport,
  handleTurnLeft,
  handleTurnRight,
} from "./transitions/index.js";
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
    case EventType.Place:
      return handlePlace(context, event);
    case EventType.Report:
      return handleReport(context);
    case EventType.TurnRight:
    case EventType.TurnLeft:
    case EventType.MoveForward:
      return handleOffTableInvalidAction(context);
    default:
      return context;
  }
};

const reduceOnTable = (
  context: RobotContext<OnTableState>,
  event: RobotEvent
) => {
  switch (event.type) {
    case EventType.Place:
      return handlePlace(context, event);
    case EventType.Report:
      return handleReport(context);
    case EventType.TurnRight:
      return handleTurnRight(context);
    case EventType.TurnLeft:
      return handleTurnLeft(context);
    case EventType.MoveForward:
      return handleMoveForward(context);
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
