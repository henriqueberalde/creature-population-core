import './config';
import Entity from './models/entity';
import Event, { EventType } from './models/event';
import Orchestrator from './models/orchestrator';

export default function main(): void {
  const orchestrator = new Orchestrator();
  const getOldEvent = new Event(EventType.Entity, 'getOld');

  const w1 = new Entity({
    id: 'W1',
    type: 'World',
    events: [getOldEvent],
    fields: [
      {
        key: 'age',
        value: '0',
      },
      {
        key: 'sizeX',
        value: '1000',
      },
      {
        key: 'sizeY',
        value: '1000',
      },
    ],
  });

  const e1 = new Entity({
    id: 'E1',
    type: 'Creature',
    events: [getOldEvent],
    fields: [
      {
        key: 'age',
        value: '0',
      },
      {
        key: 'size',
        value: '10',
      },
      {
        key: 'worldId',
        value: 'W1',
      },
    ],
  });

  const e2 = new Entity({
    id: 'E2',
    type: 'Creature',
    events: [getOldEvent],
    fields: [
      {
        key: 'age',
        value: '0',
      },
      {
        key: 'size',
        value: '10',
      },
      {
        key: 'worldId',
        value: 'W1',
      },
    ],
  });

  const e3 = new Entity({
    id: 'E3',
    type: 'Super Creature',
    events: [getOldEvent],
    fields: [
      {
        key: 'age',
        value: '0',
      },
      {
        key: 'size',
        value: '10',
      },
      {
        key: 'worldId',
        value: 'W1',
      },
      {
        key: 'flySpeed',
        value: '1000000',
      },
    ],
  });

  orchestrator.pushEntity(w1);
  orchestrator.pushEntity(e1);
  orchestrator.pushEntity(e2);
  orchestrator.pushEntity(e3);
  orchestrator.executeEventsRecursivly();
}

main();
