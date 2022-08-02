export enum EventType {
  Entity,
  Orchestrator,
}

export default class Event {
  public type: EventType;

  public name: string;

  public isEveryTurnEvent: boolean;

  public showType(): string {
    switch (this.type) {
      case EventType.Entity:
        return 'Entity';
      case EventType.Orchestrator:
        return 'Orchestrator';
      default:
        return '';
    }
  }

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
