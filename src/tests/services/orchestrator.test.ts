import Entity from '../../models/entity';
import EntityService from '../../services/entity_service';
import Orchestrator from '../../services/orchestrator';

let orchestrator: Orchestrator<EntityService>;

describe('Orchestrator', () => {
  describe('executeTurn', () => {
    it('WHEN called THEN adds 1 on every entity`s age', () => {
      const entities: Entity[] = [];
      const entity1 = new Entity('E1', 101, 101);
      const entity2 = new Entity('E2', 102, 102);
      const entity3 = new Entity('E3', 103, 103);

      entities.push(entity1);
      entities.push(entity2);
      entities.push(entity3);

      orchestrator = new Orchestrator(EntityService, entities);
      orchestrator.executeTurn();

      expect(entity1.age).toBe(1);
      expect(entity2.age).toBe(1);
      expect(entity3.age).toBe(1);
    });
  });
});
