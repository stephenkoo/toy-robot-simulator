import { xYEast, xYNorth } from "../../../robot/constants.js";
import { robotReducer } from "../../../robot/index.js";
import {
  RobotContext,
  EventType,
  StateType,
} from "../../../robot/types/index.js";
import { processCommand } from "./index.js";

jest.mock("chalk");

jest.mock("../../../robot/index.js", () => ({
  robotReducer: jest.fn(),
}));

const mockContext: RobotContext = {
  robot: {
    type: StateType.OffTable,
    position: null,
    direction: null,
  },
  table: [5, 5],
  log: {
    success: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

test.each([
  { command: "MOVE", event: EventType.MoveForward },
  { command: "LEFT", event: EventType.TurnLeft },
  { command: "RIGHT", event: EventType.TurnRight },
  { command: "REPORT", event: EventType.Report },
])(
  'input string "$command" will run the right command',
  ({ command, event }) => {
    processCommand(mockContext, command);
    expect(robotReducer).toHaveBeenCalledWith(mockContext, {
      type: event,
    });
  }
);

test("does not execute an unrecognized command", () => {
  const invalidCommand = "RANDOM_COMMAND";
  processCommand(mockContext, invalidCommand);
  expect(mockContext.log.error).toHaveBeenCalledWith(
    `🤔 Invalid command: ${invalidCommand}.\nTry these commands: LEFT, RIGHT, PLACE, MOVE, REPORT, EXIT`
  );
  expect(robotReducer).not.toHaveBeenCalled();
});

/**
 * Place command with coordinates that are outside the table boundary is still valid.
 * Whether command will be change state is the robotReducer's responsibility.
 */
test("executes a valid place command", () => {
  processCommand(mockContext, "PLACE 1000,-2,NORTH");

  expect(robotReducer).toHaveBeenCalledWith(mockContext, {
    type: EventType.Place,
    position: [1000, -2],
    direction: xYNorth,
  });
});

test("does not execute a place command with no arguments", () => {
  processCommand(mockContext, "PLACE");
  expect(mockContext.log.error).toHaveBeenCalledWith(
    "🤔 Missing PLACE command arguments. Try PLACE 1,2,EAST"
  );
  expect(robotReducer).not.toHaveBeenCalled();
});

test.each([
  { placeArguments: "1" },
  { placeArguments: "2,1" },
  { placeArguments: "banana,2,NORTH" },
  { placeArguments: "1,apple,SOUTH" },
  { placeArguments: "1,2,RANDOM" },
])(
  'does not execute a place command with invalid argument: "$placeArguments"',
  ({ placeArguments }) => {
    processCommand(mockContext, `PLACE ${placeArguments}`);
    expect(mockContext.log.error).toHaveBeenCalledWith(
      `🤔 ${placeArguments} isn't a valid position. Try PLACE 0,0,NORTH`
    );
    expect(robotReducer).not.toHaveBeenCalled();
  }
);

test.each([
  {
    command: "MOVE 1,2,SOUTH",
    expected: {
      type: EventType.MoveForward,
    },
  },
  {
    command: "PLACE 3,4,EAST,WEST '); DROP TABLE Students;--",
    expected: {
      type: EventType.Place,
      position: [3, 4],
      direction: xYEast,
    },
  },
  {
    command: "REPORT TO ME",
    expected: {
      type: EventType.Report,
    },
  },
  {
    command: "LEFT RIGHT -CENTER",
    expected: {
      type: EventType.TurnLeft,
    },
  },
  {
    command: "RIGHT WRONG",
    expected: {
      type: EventType.TurnRight,
    },
  },
])(
  'ignores extra arguments in commands: "$command"',
  ({ command, expected }) => {
    processCommand(mockContext, command);
    expect(robotReducer).toHaveBeenCalledWith(mockContext, expected);
  }
);
