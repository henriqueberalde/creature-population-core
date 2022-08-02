import Entity from './entity';
import Event, { EventType } from './event';
import NotFoundEventError from './not_found_event_error';

export default class Orchestrator {
  private defaultDelayInMiliseconds = 2000;

  private entities: Entity[] = [];

  public pushEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  public getEntities(): Entity[] {
    return this.entities;
  }

  public getEntity(id: string): Entity | undefined {
    return this.entities.find((entity) => entity.id === id);
  }

  public removeEntity(entityId: string): void {
    const index = this.entities.findIndex((entity) => entity.id === entityId);
    this.entities.splice(index, 1);
  }

  private static pauseTime(milliseconds: number): void {
    const dt = new Date();
    // eslint-disable-next-line no-loops/no-loops
    while ((new Date() as any) - (dt as any) <= milliseconds) {
      /* Do nothing */
    }
  }

  public executeEventsRecursivly(
    delayInMiliseconds: number = this.defaultDelayInMiliseconds,
  ) {
    Orchestrator.pauseTime(delayInMiliseconds);

    this.executeTurn();
    this.info();
    this.executeEventsRecursivly(delayInMiliseconds);
  }

  // eslint-disable-next-line class-methods-use-this
  public executeEvent(event: Event, entity: Entity): void {
    console.log(entity.events);
    if (entity.events.filter((e) => e.name === event.name).length === 0) return;

    if (event.type === EventType.Entity) {
      entity.executeEvent(event);
    } else {
      try {
        console.log('event');
        console.log(event);

        // eslint-disable-next-line no-eval
        eval(`this.${event.name}(entity)`);
      } catch (err) {
        console.log(err);
        throw new NotFoundEventError(event.name, this);
      }
    }
  }

  private getUniqueEvents(): Event[] {
    const uniqueEvents: Event[] = [];
    this.entities.forEach((entity) => {
      entity.events.forEach((event) => {
        if (uniqueEvents.filter((e) => e.name === event.name).length === 0) {
          uniqueEvents.push(event);
        }
      });
    });

    return uniqueEvents;
  }

  private getTurnEvents(): Event[] {
    return this.getUniqueEvents().filter((event) => event.isEveryTurnEvent);
  }

  public showEvents() {
    console.table('EVENTS');
    const table = this.getUniqueEvents().map(
      (event) => `${event.name} (${event.type} ${event.type.toString()})`,
    );

    console.table(table);
  }

  public showEntities() {
    console.table('ENTITIES');

    const table = this.entities.map((entity) => ({
      id: entity.id,
      type: entity.type,
      events: entity.events.map(
        (event) => `[${event.showType()}] ${event.name}`,
      ),
    }));

    console.table(table);
  }

  public showEntitiesFields() {
    const table: any = {};

    console.log('FIELDS');

    this.entities.forEach((entity) => {
      if (entity.fields) {
        const entries = entity.fields.map((field) => [field.key, field.value]);

        table[entity.id] = Object.fromEntries(entries);
      }
    });

    console.table(table);
  }

  public info() {
    console.log('\n');
    this.showEvents();
    console.log('\n');
    this.showEntities();
    console.log('\n');
    this.showEntitiesFields();
  }

  public executeTurn() {
    console.log('Executing events of all entities');
    this.getTurnEvents().forEach((event) => {
      console.log('\n');
      console.log(`################## ${event.name} ##################`);
      this.entities.forEach((entity) => {
        this.executeEvent(event, entity);
      });
    });
  }
}
