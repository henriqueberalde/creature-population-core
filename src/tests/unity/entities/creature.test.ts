import { Vector } from 'ts-matrix';
import { Action, Creature } from '../../../entities';
import Will from '../../../entities/will';

let creature: Creature;

describe('Creature', () => {
  beforeEach(() => {
    creature = new Creature('Creature1', 10, 10);
  });
  describe('constructor', () => {
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
        expect(creature.getWill('kill_heal').value).toBe(0);
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

  describe('getWill', () => {
    it('when called then returns selected will by name', () => {
      const rightOne = new Will('right', 100, 'one', -100, 0);
      const worngOne = new Will('wrong', 100, 'one', -100, 0);
      creature.wills = [rightOne, worngOne];

      expect(creature.getWill('right_one')).toMatchObject(rightOne);
    });
    it('when not found then throw Error', () => {
      const rightOne = new Will('right', 100, 'one', -100, 0);
      creature.wills = [rightOne];

      expect(() => creature.getWill('wrong_one')).toThrow(
        'Will not found: wrong_one on creature: Creature1',
      );
    });
  });
  describe('x', () => {
    it('when called then returns position[0]', () => {
      creature.position = new Vector([10, 40]);

      expect(creature.x()).toBe(10);
    });
  });
  describe('y', () => {
    it('when called then returns position[1]', () => {
      creature.position = new Vector([10, 40]);

      expect(creature.y()).toBe(40);
    });
  });
  describe('getKillHealValue', () => {
    it('when > 20 then returns kill', () => {
      creature.getWill('kill_heal').value = 21;

      expect(creature.getKillHealValue()).toBe('kill');
    });
    it('when < -20 then returns heal', () => {
      creature.getWill('kill_heal').value = -21;

      expect(creature.getKillHealValue()).toBe('heal');
    });
    it('when >= -20 and <= 20 then returns undefined', () => {
      creature.getWill('kill_heal').value = 0;

      expect(creature.getKillHealValue()).toBe(undefined);
    });
  });
  describe('isDiferentTargetToSeek', () => {
    it('when diferent then returns true', () => {
      creature.seekingCreatureId = 'ID1';

      expect(creature.isDiferentTargetToSeek('ID2')).toBe(true);
    });
    it('when equal then returns false', () => {
      creature.seekingCreatureId = 'ID1';

      expect(creature.isDiferentTargetToSeek('ID1')).toBe(false);
    });
  });
});
