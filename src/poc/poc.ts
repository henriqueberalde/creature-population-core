import '../config';
import Orchestrator from '../models/orchestrator';
import Event, { EventType } from '../models/event';
import World from './world';
import Creature from './creature';

export default function main(): void {
  const orchestrator = new Orchestrator();

  const creatureEvents = [
    new Event(EventType.Entity, 'getOld'),
    new Event(EventType.Entity, 'grunt'),
    new Event(EventType.Entity, 'getHurt', false),
    new Event(EventType.Orchestrator, 'wills'),
    new Event(EventType.Orchestrator, 'actions'),
  ];

  orchestrator.pushEntity(
    new World({
      id: 'W1',
      type: 'World',
      events: [
        new Event(EventType.Entity, 'getOld'),
        new Event(EventType.Entity, 'changeSeason'),
      ],
      fields: [
        { key: 'sizeX', value: '100' },
        { key: 'sizeY', value: '100' },
        { key: 'age', value: '0' },
      ],
    }),
  );

  orchestrator.pushEntity(
    new Creature({
      id: 'C1',
      type: 'Creature 1',
      events: creatureEvents,
      fields: [
        { key: 'size', value: '2' },
        { key: 'world_id', value: 'W1' },
        { key: 'placement_x', value: '12' },
        { key: 'placement_y', value: '76' },
        { key: 'age', value: '0' },
      ],
    }),
  );
  orchestrator.pushEntity(
    new Creature({
      id: 'C2',
      type: 'Creature 2',
      events: creatureEvents,
      fields: [
        { key: 'size', value: '2' },
        { key: 'world_id', value: 'W1' },
        { key: 'placement_x', value: '23' },
        { key: 'placement_y', value: '34' },
        { key: 'age', value: '0' },
      ],
    }),
  );
  orchestrator.pushEntity(
    new Creature({
      id: 'C3',
      type: 'Creature 3',
      events: [new Event(EventType.Entity, 'getOld')],
      fields: [
        { key: 'size', value: '2' },
        { key: 'world_id', value: 'W1' },
        { key: 'placement_x', value: '1' },
        { key: 'placement_y', value: '1' },
        { key: 'age', value: '0' },
      ],
    }),
  );

  orchestrator.executeEventsRecursivly();
}

main();
