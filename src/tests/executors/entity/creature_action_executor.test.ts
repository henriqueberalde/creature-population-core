import { Action, Context, Creature } from '../../../entities';
import CreatureActionExecutor from '../../../executors/entity/creature_action_executor';

let context: Context;
let creature: Creature;
let creatures: Creature[] = [];
let executor: CreatureActionExecutor;

beforeEach(() => {
  creature = new Creature('C1', 1, 1);
  creatures = [creature];
  context = new Context(creatures);
  executor = new CreatureActionExecutor(context);
});

describe('EntityCreatureActionExecutor', () => {
  describe('calculateWills', () => {
    it('When called then updates desireToKill', () => {
      executor.execute(creature, new Action('calculateWills', 1, 1));

      expect(creature.desireToKill).not.toBe(0);
    });
    it('When called then updates desireToHeal', () => {
      executor.execute(creature, new Action('calculateWills', 1, 1));

      expect(creature.desireToHeal).not.toBe(0);
    });
  });
  describe('move', () => {
    it('When called then updates x', () => {
      executor.execute(creature, new Action('move', 1, 1));

      expect(creature.x).not.toBe(1);
    });
    it('When called then updates y', () => {
      executor.execute(creature, new Action('move', 1, 1));

      expect(creature.y).not.toBe(1);
    });
  });
  describe('hurt', () => {
    it('When desireToKill > 20 then subtracts other creature`s life', () => {
      creature.desireToKill = 21;
      executor.execute(creature, new Action('hurt', 1, 1));

      expect(creature.life).toBeLessThan(100);
    });
    it('When desireToKill <= 20 then do not updates other creature`s life', () => {
      creature.desireToKill = 20;
      executor.execute(creature, new Action('hurt', 1, 1));

      expect(creature.life).toBe(100);
    });
    it('When hurted creature get life <= 0 then sets it as dead creature', () => {
      creature.desireToKill = 21;
      creature.life = 1;
      executor.execute(creature, new Action('hurt', 1, 1));

      expect(creature.isDead).toBe(true);
    });
  });
  describe('heal', () => {
    it('When desireToHeal > 20 then sums random value to other creature`s life', () => {
      creature.desireToHeal = 21;
      creature.life = 99;
      executor.execute(creature, new Action('heal', 1, 1));

      expect(creature.life).toBeGreaterThan(99);
    });
    it('When desireToHeal <= 20 then do not updates creature`s life', () => {
      creature.desireToHeal = 20;
      creature.life = 99;
      executor.execute(creature, new Action('heal', 1, 1));

      expect(creature.life).toBe(99);
    });
    it('When no creature is hurt then do not updates creature`s life', () => {
      creature.desireToHeal = 21;
      creature.life = 100;
      executor.execute(creature, new Action('heal', 1, 1));

      expect(creature.life).toBe(100);
    });
  });
});
