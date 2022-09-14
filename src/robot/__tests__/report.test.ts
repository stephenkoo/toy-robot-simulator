import { xYNorth } from "../constants.js";
import { reducer } from "../reducer";
import { Coordinates, EventType, StateType } from "../types/index.js";
import { setupTest } from "../__fixtures__/index.js";

test("reports status when robot is on table", () => {
  const mockPosition: Coordinates = [1, 1];
  const { context } = setupTest({
    robot: {
      type: StateType.OnTable,
      position: [1, 1],
      direction: xYNorth,
    },
    log: {
      info: jest.fn(),
    },
  });

  reducer(context, {
    type: EventType.Report,
  });

  expect(context.log.info).toHaveBeenCalledWith(
    `📢 Robot is on 📍${mockPosition.join(",")}, facing 🧭NORTH`
  );
});

test("report status when robot is off table", () => {
  const { context } = setupTest({
    robot: {
      type: StateType.OffTable,
      position: null,
      direction: null,
    },
    log: {
      warn: jest.fn(),
    },
  });

  reducer(context, {
    type: EventType.Report,
  });

  expect(context.log.warn).toHaveBeenCalledWith(
    "📢 Robot is not on the table. Place robot on table before running other commands."
  );
});
