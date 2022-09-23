import { XYDirection } from "../types/index.js";

export const turnRight = ([x, y]: XYDirection): XYDirection =>
  [y, x === 0 ? 0 : -x] as XYDirection;

export const turnLeft = ([x, y]: XYDirection): XYDirection =>
  [y === 0 ? 0 : -y, x] as XYDirection;
