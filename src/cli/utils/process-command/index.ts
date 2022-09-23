import { robotReducer } from "../../../robot/index.js";
import { RobotContext, EventType } from "../../../robot/types/index.js";
import { Command } from "../../types.js";
import { parsePlaceCommand } from "./parse-place-command.js";
import { showExtraArgumentsWarning } from "./show-extra-arguments-warning.js";

export const processCommand = (
  robot: RobotContext,
  command: string
): RobotContext => {
  const extraArgumentsWarning = showExtraArgumentsWarning(robot.log);

  const [commandType, ...commandArguments]: (string | undefined)[] =
    command.split(" ");

  switch (commandType) {
    case Command.Place: {
      const [placeCommandArgument, ...otherArguments] = commandArguments;

      const { isValid, event, extraArguments } = parsePlaceCommand(
        robot,
        placeCommandArgument
      );

      if (!isValid) {
        break;
      }

      robot = robotReducer(robot, event);
      extraArgumentsWarning(extraArguments, Command.Place);
      extraArgumentsWarning(otherArguments);
      break;
    }
    case Command.Move: {
      robot = robotReducer(robot, {
        type: EventType.MoveForward,
      });
      extraArgumentsWarning(commandArguments);
      break;
    }
    case Command.Left: {
      robot = robotReducer(robot, {
        type: EventType.TurnLeft,
      });
      extraArgumentsWarning(commandArguments);
      break;
    }
    case Command.Right: {
      robot = robotReducer(robot, {
        type: EventType.TurnRight,
      });
      extraArgumentsWarning(commandArguments);

      break;
    }
    case Command.Report: {
      robot = robotReducer(robot, {
        type: EventType.Report,
      });
      extraArgumentsWarning(commandArguments);

      break;
    }
    default:
      robot.log.error(
        `🤔 Invalid command: ${commandType}.\nTry these commands: ${Object.values(
          Command
        ).join(", ")}`
      );
  }

  return robot;
};
