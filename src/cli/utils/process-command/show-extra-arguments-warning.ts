import { Command } from "../../types.js";
import { Logger } from "../../../types.js";

export const showExtraArgumentsWarning =
  (logger: Logger) => (args: (string | undefined)[], commandType?: Command) => {
    const nonNullArguments = args.filter(Boolean);

    if (!nonNullArguments.length) {
      return;
    }

    logger.warn(
      `Ignored extra ${
        commandType ? `${commandType} ` : ""
      }arguments: ${args.join(", ")}`
    );
  };
