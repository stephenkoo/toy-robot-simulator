import { reducer } from "../reducer.js";
import { xYEast, xYNorth, xYSouth, xYWest } from "../constants.js";
import { CardinalDirection, EventType, StateType } from "../types/index.js";
import { setupTest } from "../__fixtures__/index.js";

const clockwiseDirectionGenerator = function* () {
  while (true) {
    yield { xYDirection: xYNorth, direction: CardinalDirection.North };
    yield { xYDirection: xYEast, direction: CardinalDirection.East };
    yield { xYDirection: xYSouth, direction: CardinalDirection.South };
    yield { xYDirection: xYWest, direction: CardinalDirection.West };
  }
};

const antiClockwiseDirectionGenerator = function* () {
  while (true) {
    yield { xYDirection: xYNorth, direction: CardinalDirection.North };
    yield { xYDirection: xYWest, direction: CardinalDirection.West };
    yield { xYDirection: xYSouth, direction: CardinalDirection.South };
    yield { xYDirection: xYEast, direction: CardinalDirection.East };
  }
};

test("turns robot right in a repeating circle", () => {
  const clockwise = clockwiseDirectionGenerator();

  let { context } = setupTest({
    robot: {
      type: StateType.OnTable,
      position: [1, 1],
      direction: clockwise.next().value.xYDirection,
    },
  });

  for (let i = 0; i < 9; i++) {
    context = reducer(context, {
      type: EventType.TurnRight,
    });

    const { xYDirection, direction } = clockwise.next().value;

    expect(context.robot.direction).toEqual(xYDirection);
    expect(context.log.info).toHaveBeenLastCalledWith(
      `↩️ Robot turned right, now facing 🧭${direction}`
    );
  }
});

test("turns robot left in a repeating circle", () => {
  const antiClockwise = antiClockwiseDirectionGenerator();

  let { context } = setupTest({
    robot: {
      type: StateType.OnTable,
      position: [1, 1],
      direction: antiClockwise.next().value.xYDirection,
    },
  });

  for (let i = 0; i < 9; i++) {
    context = reducer(context, {
      type: EventType.TurnLeft,
    });

    const { xYDirection, direction } = antiClockwise.next().value;

    expect(context.robot.direction).toEqual(xYDirection);
    expect(context.log.info).toHaveBeenLastCalledWith(
      `↪️ Robot turned left, now facing 🧭${direction}`
    );
  }
});

test("does not turn robot when robot is off the table", () => {
  let { context } = setupTest({
    robot: {
      type: StateType.OffTable,
      position: null,
      direction: null,
    },
  });

  context = reducer(context, {
    type: EventType.TurnLeft,
  });

  const invalidActionMessage =
    "🚫 Place the robot on table first to make this command, e.g. PLACE 2,3,NORTH";

  expect(context.robot.direction).toBeNull();
  expect(context.log.error).toHaveBeenLastCalledWith(invalidActionMessage);

  context = reducer(context, {
    type: EventType.TurnRight,
  });

  expect(context.robot.direction).toBeNull();
  expect(context.log.error).toHaveBeenLastCalledWith(invalidActionMessage);
});
