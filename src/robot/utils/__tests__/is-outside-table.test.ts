import { Coordinates } from "../../types/index.js";
import { isOutsideTable } from "../is-outside-table";

test.each<{
  coordinates: Coordinates;
  tableBoundary: Readonly<Coordinates>;
}>([
  { coordinates: [5, 2], tableBoundary: [4, 4] },
  { coordinates: [1, 0], tableBoundary: [0, 10] },
  { coordinates: [0, -1], tableBoundary: [0, 0] },
  { coordinates: [11, 0], tableBoundary: [10, 0] },
])(
  "coordinates $coordinates are outside table boundary $tableBoundary",
  ({ coordinates, tableBoundary }) => {
    expect(isOutsideTable(coordinates, tableBoundary)).toBe(true);
  }
);

test.each<{
  coordinates: Coordinates;
  tableBoundary: Readonly<Coordinates>;
}>([
  { coordinates: [0, 0], tableBoundary: [0, 0] },
  { coordinates: [50, 2], tableBoundary: [51, 10] },
  { coordinates: [3, 0], tableBoundary: [5, 90] },
  { coordinates: [3, 9], tableBoundary: [3, 9] },
])(
  "coordinates $coordinates are within table boundary $tableBoundary",
  ({ coordinates, tableBoundary }) => {
    expect(isOutsideTable(coordinates, tableBoundary)).toBe(false);
  }
);
