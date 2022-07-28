export enum EventType {
  Entity,
  Orchestrator,
}

export default class Event {
  public type: EventType;

  public name: string;

  public isEveryTurnEvent: boolean;

  constructor(
    eventType: EventType,
    name: string,
    isEveryTurnEvent: boolean = true,
  ) {
    this.type = eventType;
    this.name = name;
    this.isEveryTurnEvent = isEveryTurnEvent;
  }
}
