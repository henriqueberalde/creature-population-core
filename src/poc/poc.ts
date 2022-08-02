import '../config';
import Orchestrator from '../models/orchestrator';
import World from './world';
import Creature from './creature';

export default function main(): void {
  const orchestrator = new Orchestrator();
  console.log('Creating W1');
  orchestrator.pushEntity(
    new World({
      id: 'W1',
      type: 'World',
    }),
  );

  console.log('Creating C1');
  orchestrator.pushEntity(
    new Creature({
      id: 'C1',
      type: 'Creature',
    }),
  );

  console.log('Creating C2');
  orchestrator.pushEntity(
    new Creature({
      id: 'C2',
      type: 'Creature',
    }),
  );

  console.log('Creating C3');
  orchestrator.pushEntity(
    new Creature({
      id: 'C3',
      type: 'Creature',
    }),
  );
  orchestrator.executeEventsRecursivly();
}

main();
