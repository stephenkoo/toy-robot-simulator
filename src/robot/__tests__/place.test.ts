import { xYEast, xYNorth, xYSouth, xYWest } from "../constants.js";
import { reducer } from "../reducer.js";
import { EventType, Coordinates } from "../types/index.js";
import { setupTest } from "../__fixtures__/index.js";

test("places robot on table", () => {
  const setup = setupTest();
  let { context } = setup;

  const position: Coordinates = [1, 0];
  context = reducer(context, {
    type: EventType.Place,
    position,
    direction: xYNorth,
  });

  expect(context.robot.position).toEqual(position);
  expect(context.robot.direction).toEqual(xYNorth);

  expect(context.log.info).toHaveBeenCalledTimes(1);
  expect(context.log.info).toHaveBeenLastCalledWith(
    `📢 Robot is on 📍${position.join(",")}, facing 🧭NORTH`
  );

  context = reducer(context, {
    type: EventType.Place,
    position: [5, 2],
    direction: xYSouth,
  });

  expect(context.robot.position).toEqual([5, 2]);
  expect(context.robot.direction).toEqual(xYSouth);

  expect(context.log.info).toHaveBeenCalledTimes(2);
  expect(context.log.info).toHaveBeenLastCalledWith(
    "📢 Robot is on 📍5,2, facing 🧭SOUTH"
  );
});

test("does not place robot outside table boundary", () => {
  const setup = setupTest();
  let context = setup.context;

  const positionTooFarEast: Coordinates = [context.table[0] + 1, 0];
  const positionTooFarWest: Coordinates = [-1, 0];
  const positionTooFarNorth: Coordinates = [0, context.table[1] + 1];
  const positionTooFarSouth: Coordinates = [0, -1];

  context = reducer(context, {
    type: EventType.Place,
    position: positionTooFarEast,
    direction: xYNorth,
  });

  const outsideTableWarning = `😫 Robot can't be placed outside the table boundary: ${context.table.join(
    ","
  )}`;

  expect(context.log.warn).toHaveBeenCalledTimes(1);
  expect(context.log.warn).toHaveBeenLastCalledWith(outsideTableWarning);

  context = reducer(context, {
    type: EventType.Place,
    position: positionTooFarWest,
    direction: xYEast,
  });

  expect(context.log.warn).toHaveBeenCalledTimes(2);
  expect(context.log.warn).toHaveBeenLastCalledWith(outsideTableWarning);

  expect(context.robot.position).toBeNull();
  expect(context.robot.direction).toBeNull();

  const validPlacement = {
    position: context.table,
    direction: xYNorth,
  };

  context = reducer(context, {
    type: EventType.Place,
    ...validPlacement,
  });

  context = reducer(context, {
    type: EventType.Place,
    position: positionTooFarNorth,
    direction: xYWest,
  });

  expect(context.log.warn).toHaveBeenCalledTimes(3);
  expect(context.log.warn).toHaveBeenLastCalledWith(outsideTableWarning);

  context = reducer(context, {
    type: EventType.Place,
    position: positionTooFarSouth,
    direction: xYNorth,
  });

  expect(context.log.warn).toHaveBeenCalledTimes(4);
  expect(context.log.warn).toHaveBeenLastCalledWith(outsideTableWarning);

  expect(context.robot.position).toEqual(validPlacement.position);
  expect(context.robot.direction).toEqual(validPlacement.direction);
});
