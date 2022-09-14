import { Logger } from "../../types.js";
import {
  RobotContext,
  Coordinates,
  RobotState,
  StateType,
} from "../types/index.js";

type SetupTestProps = {
  robot?: RobotState;
  table?: Coordinates;
  log?: Partial<Logger>;
};

export const setupTest = (props?: SetupTestProps) => {
  const robot = props?.robot ?? {
    type: StateType.OffTable,
    position: null,
    direction: null,
  };

  const table = props?.table ?? [5, 5];

  const log = {
    success: (message: string) => message,
    info: (message: string) => message,
    warn: (message: string) => message,
    error: (message: string) => message,
    log: (message: string) => message,
    ...props?.log,
  };

  const context: RobotContext = {
    robot,
    table,
    log,
  };

  return { context };
};
