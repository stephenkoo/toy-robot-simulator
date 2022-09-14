import { Pose } from "../types/index.js";

export enum StateType {
  OffTable,
  OnTable,
}

type State<T extends StateType> = { type: T };

export type OffTableState = State<StateType.OffTable> & {
  direction: null;
  position: null;
};

export type OnTableState = State<StateType.OnTable> & Pose;

export type RobotState = OffTableState | OnTableState;
