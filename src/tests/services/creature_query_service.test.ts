import { Context, Creature } from '../../models';
import CreatureQueryService from '../../services/creature_query_service';

let creature: Creature;
let context: Context;

beforeEach(() => {
  creature = new Creature('C1', 101, 101);
  context = new Context([]);
  context.entities.push(creature);
});

describe('CreatureQueryService', () => {
  describe('removeDeadCreatures', () => {
    it('WHEN there is creatures with less than 100 life THEN it should be removed from context', () => {
      const creature2 = new Creature('C2', 102, 102);

      creature.life = 0;
      creature2.life = -10;

      context.entities.push(creature2);

      CreatureQueryService.removeDeadCreatures(context);

      expect(context.entities.length).toBe(0);
    });
  });

  describe('getRandomCreature', () => {
    it('WHEN called THEN should return a Creature instance', () => {
      expect(CreatureQueryService.getRandomCreature(context)).toBe(creature);
    });
  });

  describe('getRandomHurtCreature', () => {
    it('WHEN called THEN should return a Creature instance that has life less than 100', () => {
      const hurtCreature = new Creature('Ch', 100, 100);
      hurtCreature.life = 50;
      context.entities.push(hurtCreature);

      expect(CreatureQueryService.getRandomCreature(context)).toBe(
        hurtCreature,
      );
    });
  });

  describe('getAllHurtCreatures', () => {
    it('WHEN called THEN should return all Creatures instance taht has life less than 100', () => {
      const hurtCreature1 = new Creature('Ch1', 100, 100);
      const hurtCreature2 = new Creature('Ch2', 100, 100);
      hurtCreature1.life = 50;
      hurtCreature2.life = 50;
      context.entities.push(hurtCreature1);
      context.entities.push(hurtCreature2);

      const result = CreatureQueryService.getAllHurtCreatures(context);

      expect(result.length).toBe(2);
      expect(result[0].id).toBe('Ch1');
      expect(result[1].id).toBe('Ch2');
    });
  });
});
