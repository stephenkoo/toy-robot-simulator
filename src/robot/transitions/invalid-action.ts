import { RobotContext, OffTableState } from "../types/index.js";

export const handleOffTableInvalidAction = (
  context: RobotContext<OffTableState>
): RobotContext<OffTableState> => {
  context.log.error(
    "🚫 Place the robot on table first to make this command, e.g. PLACE 2,3,NORTH"
  );
  return context;
};
