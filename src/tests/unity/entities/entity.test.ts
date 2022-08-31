import { Action, Entity } from '../../../entities';
import Will from '../../../entities/will';

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
      it('empty wills is set', () => {
        expect(entity.wills.length).toBe(0);
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
      it('actions are set', () => {
        expect(entity.actions[0].name).toBe('customAction1');
        expect(entity.actions[1].name).toBe('customAction2');
        expect(entity.actions[2].name).toBe('customAction3');
      });
    });
    describe('When called passing wills', () => {
      beforeEach(() => {
        const wills = [
          new Will('highName1', 100, 'lowName1', -100, 0),
          new Will('highName2', 100, 'lowName2', -100, 0),
        ];
        entity = new Entity('E1', undefined, wills);
      });
      it('wills are set', () => {
        expect(entity.wills[0].getName()).toBe('highName1_lowName1');
        expect(entity.wills[1].getName()).toBe('highName2_lowName2');
      });
    });
  });
});
