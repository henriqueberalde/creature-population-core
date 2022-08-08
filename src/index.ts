import './config';
import Entity from './models/entity';
import EntityService from './services/entity_service';
import Orchestrator from './services/orchestrator';

const entities: Entity[] = [
  new Entity('E1', 100, 100),
  new Entity('E2', 100, 100),
  new Entity('E3', 100, 100),
  new Entity('E4', 100, 100),
];

export default function main(): void {
  const o = new Orchestrator<EntityService>(EntityService, entities);
  o.executeTurnRecursive(500);
}

main();
