import { Action, Creature } from '../../entities';

let creature: Creature;

describe('Creature', () => {
  describe('constructor', () => {
    beforeEach(() => {
      creature = new Creature('Creature1', 10, 10);
    });
    describe('When called then', () => {
      it('fixed props are set', () => {
        expect(creature.life).toBe(100);
        expect(creature.isDead).toBe(false);
      });
      it('fixed space props are set', () => {
        expect(creature.velocity.values[0]).toBe(0);
        expect(creature.velocity.values[1]).toBe(0);

        expect(creature.acceleration.values[0]).toBe(0);
        expect(creature.acceleration.values[1]).toBe(0);

        expect(creature.target.values[0]).toBeGreaterThanOrEqual(100);
        expect(creature.target.values[0]).toBeLessThanOrEqual(900);
        expect(creature.target.values[1]).toBeGreaterThanOrEqual(100);
        expect(creature.target.values[1]).toBeLessThanOrEqual(900);

        expect(creature.maxSpeed).toBe(15);
        expect(creature.maxSteringForce).toBe(2);
        expect(creature.maxAcceleration).toBe(2);
        expect(creature.breakingRadius).toBe(400);
      });
      it('fixed will props are set', () => {
        expect(creature.desireToKillOrHeal).toBe(0);
      });
      it('fixed actions are set', () => {
        expect(creature.actions[0].name).toBe('getOld');
        expect(creature.actions[1].name).toBe('updateDesireToKillOrHeal');
        expect(creature.actions[2].name).toBe('defineTarget');
        expect(creature.actions[3].name).toBe('move');
        expect(creature.actions[4].name).toBe('hurt');
        expect(creature.actions[5].name).toBe('heal');
      });
    });
    describe('When called passing id, x, y then', () => {
      it('name is set', () => {
        expect(creature.id).toBe('Creature1');
      });
      it('space props are set', () => {
        expect(creature.position.values[0]).toBe(10);
        expect(creature.position.values[1]).toBe(10);
      });
    });
    describe('When called passing actions then', () => {
      it('actions are set', () => {
        const actions = [
          new Action('firstCustomAction', 1, 1),
          new Action('secondCustomAction', 1, 1),
          new Action('thirdCustomAction', 1, 1),
        ];
        creature = new Creature('Creature1', 10, 10, actions);

        expect(creature.actions[0].name).toBe('firstCustomAction');
        expect(creature.actions[1].name).toBe('secondCustomAction');
        expect(creature.actions[2].name).toBe('thirdCustomAction');
      });
    });
    describe('When called passing maxSpeed', () => {
      it('actions are set', () => {
        creature = new Creature('Creature1', 10, 10, undefined, 500);

        expect(creature.maxSpeed).toBe(500);
      });
    });
  });
});
