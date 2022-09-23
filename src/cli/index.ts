import { defaultTableBoundary, initialRobotState } from "../robot/constants.js";
import { logger } from "./utils/logger.js";
import { RobotContext, Coordinates } from "../robot/types/index.js";
import { Command } from "commander";
import { runInteractiveMode } from "./interactive-mode.js";

const createRobot = (): RobotContext => ({
  robot: initialRobotState,
  table: defaultTableBoundary as Coordinates,
  log: logger,
});

const program = new Command();

export const initializeCliApp = async () => {
  logger.title("TOY ROBOT SIMULATOR 🤖");

  logger.info(
    `Available commands:\n
PLACE   - Place robot on table using PLACE X,Y,F, e.g. PLACE 2,4,WEST
LEFT    - Turn robot left by 90 degrees
RIGHT   - Turn robot right by 90 degrees
MOVE    - Move robot in direction it is facing
REPORT  - Report robot position on the table or if robot is off the table
EXIT    - Exits the program
`
  );

  program.description("Toy robot simulator").parse(process.argv);

  const robot = createRobot();

  runInteractiveMode(robot);
};
