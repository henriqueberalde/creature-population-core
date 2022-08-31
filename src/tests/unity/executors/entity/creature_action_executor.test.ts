import { Action, Context, Creature } from '../../../../entities';
import CreatureActionExecutor from '../../../../executors/entity/creature_action_executor';

const killHeal = 'kill_heal';
let context: Context;
let creature: Creature;
let creatures: Creature[] = [];
let executor: CreatureActionExecutor;
let creatureCloser: Creature;
let creatureFarther: Creature;

describe('EntityCreatureActionExecutor', () => {
  beforeEach(() => {
    creature = new Creature('C1', 1, 1);
    creatures = [creature];
    context = new Context(creatures);
    executor = new CreatureActionExecutor(context);
  });
  describe('updateDesireToKillOrHeall', () => {
    it('When called then updates will kill_heal', () => {
      executor.execute(creature, new Action('updateDesireToKillOrHeall', 1, 1));

      expect(creature.getWill(killHeal).getValue()).not.toBe(0);
    });
  });
  describe('defineTarget', () => {
    beforeEach(() => {
      creatureCloser = new Creature('C_close', 10, 10);
      creatureFarther = new Creature('C_far', 100, 100);

      creatures.push(creatureCloser);
      creatures.push(creatureFarther);
    });
    describe('setTargetToKill', () => {
      it('When creature has desire to kill then set target to seek the closer creature', () => {
        creature.getWill('kill_heal').value = 30;

        executor.execute(creature, new Action('defineTarget', 1, 1));

        expect(creature.target.values[0]).toBe(
          creatureCloser.position.values[0],
        );
        expect(creature.target.values[1]).toBe(
          creatureCloser.position.values[1],
        );
      });
    });
    describe('setTargetToHeal', () => {
      it('When creature has desire to heal then set target to seek the closer hurt creature', () => {
        const hurtCreature = new Creature('C_close', 50, 50);

        hurtCreature.life = 50;
        creatures.push(hurtCreature);

        creature.getWill('kill_heal').value = -30;

        executor.execute(creature, new Action('defineTarget', 1, 1));

        expect(creature.target.values[0]).toBe(hurtCreature.position.values[0]);
        expect(creature.target.values[1]).toBe(hurtCreature.position.values[1]);
      });
    });
    describe('setRandomTarget', () => {
      it('When creature has undefined desire kill_hell then set target to random ', () => {
        creature.getWill('kill_heal').value = 0;

        executor.execute(creature, new Action('defineTarget', 1, 1));

        expect(creature.target.values[0]).not.toBe(1);
        expect(creature.target.values[0]).not.toBe(1);
      });
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
    it('When will kill_heal > 20 then subtracts other creature`s life', () => {
      creature.getWill(killHeal).value = 21;
      executor.execute(creature, new Action('hurt', 1, 1));

      expect(creature.life).toBeLessThan(100);
    });
    it('When will kill_heal <= 20 and >= -20 then do not updates other creature`s life', () => {
      creature.getWill(killHeal).value = 20;
      executor.execute(creature, new Action('hurt', 1, 1));

      expect(creature.life).toBe(100);
    });
    it('When hurted creature get life <= 0 then sets it as dead creature', () => {
      creature.getWill(killHeal).value = 21;
      creature.life = 1;
      executor.execute(creature, new Action('hurt', 1, 1));

      expect(creature.isDead).toBe(true);
    });
  });
  describe('heal', () => {
    it('When will kill_heal < -20 then sums random value to other creature`s life', () => {
      creature.getWill(killHeal).value = -21;
      creature.life = 99;
      executor.execute(creature, new Action('heal', 1, 1));

      expect(creature.life).toBeGreaterThan(99);
    });
    it('When will kill_heal >= -20 and <= 20 then do not updates creature`s life', () => {
      creature.getWill(killHeal).value = -20;
      creature.life = 99;
      executor.execute(creature, new Action('heal', 1, 1));

      expect(creature.life).toBe(99);
    });
    it('When no creature is hurt then do not updates creature`s life', () => {
      creature.getWill(killHeal).value = -21;
      creature.life = 100;
      executor.execute(creature, new Action('heal', 1, 1));

      expect(creature.life).toBe(100);
    });
  });
});
