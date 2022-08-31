import { Context, Entity } from '../../../entities';

let context: Context;
let entities: Entity[];

describe('Context', () => {
  describe('constructor', () => {
    beforeEach(() => {
      entities = [new Entity('E1'), new Entity('E2'), new Entity('E3')];
      context = new Context(entities);
    });
    describe('When called', () => {
      it('entities is set', () => {
        expect(context.entities).toMatchObject(entities);
      });
      it('currentCycle is set', () => {
        expect(context.currentCycle).toBe(1);
      });
    });
  });
});
