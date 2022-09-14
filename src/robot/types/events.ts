import { Pose } from "../types/index.js";

export enum EventType {
  Place,
  Report,
  TurnRight,
  TurnLeft,
  MoveForward,
}

type Event<T extends EventType> = { type: T };

export type PlaceEvent = Event<EventType.Place> & Pose;

export type ReportEvent = Event<EventType.Report>;

export type TurnRightEvent = Event<EventType.TurnRight>;

export type TurnLeftEvent = Event<EventType.TurnLeft>;

export type MoveForwardEvent = Event<EventType.MoveForward>;

export type RobotEvent =
  | PlaceEvent
  | ReportEvent
  | TurnRightEvent
  | TurnLeftEvent
  | MoveForwardEvent;
