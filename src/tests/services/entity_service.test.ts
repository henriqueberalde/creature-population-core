import Context from '../../models/context';
import Entity from '../../models/entity';
import EntityService from '../../services/entity_service';

let entity: Entity;
let context: Context;
let service: EntityService;

beforeEach(() => {
  entity = new Entity('E1');
  context = new Context([]);
});

describe('EntityService', () => {
  describe('isEndOfGame', () => {
    it('WHEN context.entities.length > 0 THEN returns false', () => {
      context.entities.push(entity);
      expect(EntityService.isEndOfGame(context)).toBe(false);
    });
    it('WHEN context.entities.length = 0 THEN returns true', () => {
      expect(EntityService.isEndOfGame(context)).toBe(true);
    });
  });

  describe('doActions', () => {
    it('WHEN called THEN sums 1 on it`s entity age', () => {
      const entityOldAge = entity.age;
      context.entities.push(entity);
      service = new EntityService(entity, context);
      service.doActions();

      expect(context.entities[0].age).toBe(entityOldAge + 1);
    });
  });
});
