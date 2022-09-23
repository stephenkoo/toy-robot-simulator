import { RobotContext } from "../robot/types/index.js";
import inquirer from "inquirer";
import { Command } from "./types.js";
import { processCommand } from "./utils/process-command/index.js";

export const runInteractiveMode = (robot: RobotContext) => {
  const prompt = () => {
    inquirer
      .prompt<{ command: string }>([
        {
          name: "command",
          message: "Enter command >",
          filter: (answer: string) => answer.trim().toUpperCase(),
        },
      ])
      .then(({ command }) => {
        if (command === Command.Exit) {
          robot.log.info("👋 Bye");
          return;
        }

        robot = processCommand(robot, command);
        prompt();
      });
  };

  prompt();
};
