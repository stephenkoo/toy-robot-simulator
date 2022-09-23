import { defaultTableBoundary, initialRobotState } from "../robot/constants.js";
import { logger } from "./utils/logger.js";
import { RobotContext, Coordinates } from "../robot/types/index.js";
import { Command } from "commander";
import { runAutomatedMode } from "./automated-mode.js";
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
    "You can also run this program with commands in a .txt file, e.g. `npm run start -- -f datasets/set1.txt`\n"
  );

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

  program
    .description("Toy robot simulator")
    .option(
      "-f, --file <filename>.txt",
      "execute text file(s) with robot commands"
    )
    .parse(process.argv);

  const { file } = program.opts<{ file: string }>();

  const robot = createRobot();

  if (file) {
    runAutomatedMode(robot, file);
  } else {
    runInteractiveMode(robot);
  }
};
