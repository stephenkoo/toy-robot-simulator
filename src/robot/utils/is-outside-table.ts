import { Coordinates } from "../types/index.js";

export const isOutsideTable = (
  coordinates: Coordinates,
  tableBoundary: Readonly<Coordinates>
) =>
  coordinates.some((coordinate, index) => {
    const tableCoordinate: number = tableBoundary[index];
    return coordinate < 0 || coordinate > tableCoordinate;
  });
