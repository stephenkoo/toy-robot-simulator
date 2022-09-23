import { Coordinates, XYDirection } from "../types/index.js";

export const getForwardCoordinates = (
  position: Coordinates,
  direction: XYDirection
): Coordinates => [position[0] + direction[0], position[1] + direction[1]];
