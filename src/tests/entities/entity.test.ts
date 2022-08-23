import { Action, Entity } from '../../entities';

let entity: Entity;

describe('Entity', () => {
  describe('constructor', () => {
    beforeEach(() => {
      entity = new Entity('E1');
    });
    describe('When called passing id', () => {
      it('id is set', () => {
        expect(entity.id).toBe('E1');
      });
      it('fixed age is set', () => {
        expect(entity.age).toBe(0);
      });
      it('fixed action is set', () => {
        expect(entity.actions.length).toBe(1);
        expect(entity.actions[0].name).toBe('getOld');
      });
    });
    describe('When called passing actions', () => {
      beforeEach(() => {
        const actions = [
          new Action('customAction1'),
          new Action('customAction2'),
          new Action('customAction3'),
        ];
        entity = new Entity('E1', actions);
      });
      it('aqctions are set', () => {
        expect(entity.actions[0].name).toBe('customAction1');
        expect(entity.actions[1].name).toBe('customAction2');
        expect(entity.actions[2].name).toBe('customAction3');
      });
    });
  });
});
