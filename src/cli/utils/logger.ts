import chalk from "chalk";

type ConsoleErrorParams = Parameters<typeof console.error>;
type ConsoleLogParams = Parameters<typeof console.log>;
type ConsoleInfoParams = Parameters<typeof console.info>;
type ConsoleWarnParams = Parameters<typeof console.warn>;

export const logger = {
  error: (
    message?: ConsoleErrorParams[0],
    ...optionalParams: ConsoleErrorParams[1]
  ) => console.error(chalk.bold.red(message), ...optionalParams),
  success: (
    message?: ConsoleLogParams[0],
    ...optionalParams: ConsoleLogParams[1]
  ) => console.log(chalk.green(message), ...optionalParams),
  warn: (
    message?: ConsoleWarnParams[0],
    ...optionalParams: ConsoleWarnParams[1]
  ) => console.warn(chalk.yellow(message), ...optionalParams),
  info: (
    message?: ConsoleInfoParams[0],
    ...optionalParams: ConsoleInfoParams[1]
  ) => console.info(chalk.blue(message), ...optionalParams),
  title: (
    message?: ConsoleLogParams[0],
    ...optionalParams: ConsoleLogParams[1]
  ) => console.log(chalk.bgBlue.bold(message), ...optionalParams),
  log: (
    message?: ConsoleLogParams[0],
    ...optionalParams: ConsoleLogParams[1]
  ) => console.log(message, ...optionalParams),
};
