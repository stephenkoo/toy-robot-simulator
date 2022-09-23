import { defaultTableBoundary, xYWest } from "./constants.js";
import { reducer as robotReducer } from "./reducer.js";
import { RobotContext } from "./types/context.js";
import { EventType } from "./types/events.js";
import { Coordinates } from "./types/space.js";
import { StateType } from "./types/states.js";

export const initializeApp = () => {
  let robot: RobotContext = {
    robot: {
      type: StateType.OffTable,
      position: null,
      direction: null,
    },
    table: defaultTableBoundary as Coordinates,
    log: {
      info: console.info,
      success: console.log,
      warn: console.warn,
      error: console.error,
      log: console.log,
    },
  };

  robot = robotReducer(robot, {
    type: EventType.Report,
  });

  robotReducer(robot, {
    type: EventType.Place,
    position: [2, 3],
    direction: xYWest,
  });
};
