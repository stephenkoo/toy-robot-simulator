import { xYEast, xYNorth, xYSouth, xYWest } from "../constants.js";
import { reducer } from "../reducer.js";
import { EventType } from "../types/events.js";
import { CardinalDirection, Coordinates } from "../types/space.js";
import { StateType } from "../types/states.js";
import { setupTest } from "../__fixtures__/index.js";

const mockTableBoundary: Coordinates = [5, 5];

const getTableEdgePosition = (
  tableBoundary: Coordinates,
  direction: CardinalDirection
): Coordinates => {
  switch (direction) {
    case CardinalDirection.North:
    case CardinalDirection.East:
      return tableBoundary;
    case CardinalDirection.South:
    case CardinalDirection.West:
      return [0, 0];
  }
};

const eachDirectionTests = [
  { xYDirection: xYNorth, direction: CardinalDirection.North },
  { xYDirection: xYSouth, direction: CardinalDirection.South },
  { xYDirection: xYEast, direction: CardinalDirection.East },
  { xYDirection: xYWest, direction: CardinalDirection.West },
];

test.each(eachDirectionTests)(
  "moves robot 1 step $direction when robot is facing $direction",
  ({ xYDirection, direction }) => {
    const position0: Coordinates = [3, 3];

    const setup = setupTest({
      robot: {
        type: StateType.OnTable,
        direction: xYDirection,
        position: position0,
      },
    });
    let { context } = setup;

    context = reducer(context, {
      type: EventType.MoveForward,
    });

    const position1: Coordinates = [
      position0[0] + xYDirection[0],
      position0[1] + xYDirection[1],
    ];

    expect(context.robot.position).toEqual(position1);
    expect(context.log.info).toHaveBeenCalledWith(
      `💨 Robot moved forward to 📍${position1.join(
        ","
      )}, facing 🧭${direction}`
    );

    context = reducer(context, {
      type: EventType.MoveForward,
    });

    const position2: Coordinates = [
      position1[0] + xYDirection[0],
      position1[1] + xYDirection[1],
    ];

    expect(context.robot.position).toEqual(position2);
    expect(context.log.info).toHaveBeenCalledWith(
      `💨 Robot moved forward to 📍${position2.join(
        ","
      )}, facing 🧭${direction}`
    );
  }
);

test.each(eachDirectionTests)(
  "does not move robot $direction when robot is on the $direction-most table boundary",
  ({ xYDirection, direction }) => {
    const startingPosition = getTableEdgePosition(mockTableBoundary, direction);

    const setup = setupTest({
      robot: {
        type: StateType.OnTable,
        direction: xYDirection,
        position: startingPosition,
      },
    });

    let { context } = setup;

    context = reducer(context, {
      type: EventType.MoveForward,
    });

    expect(context.robot.position).toEqual(startingPosition);
    expect(context.log.warn).toHaveBeenCalledWith(
      `🚧 Robot can't move forward - it'll fall of the table of size ${context.table.join(
        ","
      )}`
    );
  }
);
