import { createReadStream } from "fs";
import { resolve } from "path";
import { createInterface } from "readline";
import { RobotContext } from "../robot/types/index.js";
import { processCommand } from "./utils/process-command/index.js";

export const runAutomatedMode = (context: RobotContext, file: string) => {
  const resolvedPath = resolve(file);

  const rl = createInterface({
    input: createReadStream(resolvedPath),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    context.log.log(line);
    context = processCommand(context, line);
  });

  rl.on("error", function (error) {
    context.log.error(`error: ${error.message}`);
  });
};
